import { useContext, useState } from "react";
import { assets } from "../assets/frontendassets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  // 7
  const {
    navigate,
    backenUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  //1.  here , we are state variable and we will link them to input fields. so that we can update the state variable whenever the input fields data is getting changed.
  const [formData, setFormData] = useState({
    // In this we will add multiple property, user data
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  //2. After that to store the value in this object, we will add one onchange handler function
  const onChangeHandler = (e) => {
    const name = e.target.name; // using this we will get the name 
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  
  //1. intit pay for razor pay
  const initPay = (order)=>{
    // in parameter we will write order so we will set object detail in this paramerter order.
    const options = {
      // First, add the razor pay key Id.
      // "Razorpay_key_id ="rzp_test_yCdJquTC727i5J"" but in frontend we need this only so add this one in frontend .env file

      // After that first we will defined the key.
      key: import.meta.env.Vite_Razorpay_key_id,
      // After that add the amount property.
      amount: order.amount,
      // After that add the currency
      currency: order.currency,
      // After that add the product name.
      name: "Order Payment",
      description: "Order Payment",
      // After that provide order id
      order_id: order.id,
      receipt: order.receipt,
      // After that here we will create the handler function so that we will call the payment integration Api.
      handler: async (response)=>{
        console.log(response);
        // After that we will send our orderId in backend.
        try {
          const {data} = await axios.post(backenUrl + "/api/order/verifyRazorpay", response, {headers:{token}} )
        //  response <-- In body we are providing response
          // {headers:{token}}  <-- In headers i am providing token.
          if(data.success){
            // if true it means our payment is successfull and it is verify.
            // in that case we will navigate the users on the orders page.
            navigate("/orders")
            // After that clear the cart
            setCartItems({})

          }
        } catch (error) {
          console.log(error);
          toast.error(error)
          
          
        }
      } 
    }
    // After that here create one variable
    const rzp = new window.Razorpay(options)
    // after that open at razor pay
    rzp.open()//After adding this it will create one popup where we can execute our payment
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // prevent form after submission

  

    // 8.
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            // After that we will add one check
            if (itemInfo) {
              // if itemInfo avaliable in that case , in this product data "cartItems[items]" we will add the size and quantity.
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];

              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        case "cod":
          const response = await axios.post(
            backenUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data);

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        // After this break statement we will add one more case for stripe payment method.
        case "stripe":
          // here add one Api call to our stripe end point
          const responseStripe = await axios.post(
            backenUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            // if true, then we get session url.
            const { session_url } = responseStripe.data;
            // After that on session_url send the users
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }

          break;
          // one more case for razorpay payment method.
          case 'razorpay' :
            // After that call the razorpay Api
            const responseRazorpay = await axios.post(backenUrl + "/api/order/razorpay", orderData, {headers:{token}})
            // orderData = in body we are sending orderData
            // {headers:{token}} => In headers we are providing token

            if(responseRazorpay.data.success){
              // if true
              // console.log(responseRazorpay.data.order);
              initPay(responseRazorpay.data.order);


              
            }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    // 5. relacing div to form tag
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ----- Left side ----- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            // 3
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
            className="border border-gray-300 rounded py-1.5 px-3 w-full"
            type="text"
            placeholder="First Name"
          />

          <input
            // 3
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            className="border border-gray-300 rounded py-1.5 px-3 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          // 3
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          className="border border-gray-300 rounded py-1.5 px-3 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          // 3
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
          className="border border-gray-300 rounded py-1.5 px-3 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            // 3
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
            className="border border-gray-300 rounded py-1.5 px-3 w-full"
            type="text"
            placeholder="City"
          />

          <input
            // 3
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
            className="border border-gray-300 rounded py-1.5 px-3 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            // 3
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
            className="border border-gray-300 rounded py-1.5 px-3 w-full"
            type="number"
            placeholder="Zipcode"
          />

          <input
            // 3
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
            className="border border-gray-300 rounded py-1.5 px-3 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          // 3
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
          className="border border-gray-300 rounded py-1.5 px-3 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/*---- Right Side ------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          {/* Mount here CartTotal component  */}
          <CartTotal />
        </div>
        <div className="mt-12">
          {/* Mount here Title component */}
          <Title text1={"Payment"} text2={"Method"} />
          {/* ---- Payment Method Selection ---- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-500" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash On Delivery
              </p>
            </div>
          </div>
          {/* button */}
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              Placed Order
            </button>
            {/*4. we are removing onclick function and adding type ="submit"  */}
            {/* onClick={()=>navigate("/orders")} */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
