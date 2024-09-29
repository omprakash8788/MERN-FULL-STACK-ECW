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
    const name = e.target.name; // using this we will get the name property of the input fields and it will be store in this name variable
    // After the get the value of the input fields
    const value = e.target.value;
    //After that to update this object using this name and value property.
    setFormData((data) => ({ ...data, [name]: value }));
  };
  //3 After that link this formData and  onChangeHandler to every input fields

  // 6. create onSubmit handler function
  const onSubmitHandler = async (e) => {
    // link this function to form tag.
    e.preventDefault(); // prevent form after submission

    // After that write the logic.
    // So, that whenever we will place the order using the COD then the order will be placed.

    // 8.
    try {
      let orderItems = [];
      // In this array we will add the all product from our cartItem
      // for that use one for In Loop
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            // cartItems[items][item]>0 - It means the product is added in the cart and the quantity is > 0
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            // After that we will add one check
            if (itemInfo) {
              // if itemInfo avaliable in that case , in this product data "cartItems[items]" we will add the size and quantity.
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              // after that we have to add this item object " orderItems = [];" in this array.
              orderItems.push(itemInfo);
            }
          }
        }
      }
      // 9
      // Now check this logic working or not.
      // console.log(orderItems);
      // order data.
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        // Now using this orderdata we can placed the order.
      };
      // After that use switch case for different payment method.
      switch (method) {
        // Api calls for cash on delivery order(COD)
        case 'cod':
          const response= await axios.post(backenUrl + '/api/order/place', orderData, {headers:{token}})
          console.log(response.data);
          
          if(response.data.success){
            // If it is true in that case we will add the setCartItems and we will provide the empty object, its means the order will be placed. in frontend also we are clearing the cart data
            setCartItems({})
            // After that we will navigate the users on orders page.
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break;

        default:
          break;
      }

      // switch (method) {
      //   // Api calls for cash on delivery order(COD)
      //   case 'cod': {
      //     const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
      //     console.log(response.data);
      
      //     if (response.data.success) {
      //       // If it is true, set the cart items to an empty object to clear the cart
      //       setCartItems({});
      //       // Navigate the user to the orders page
      //       navigate('/orders');
      //     } else {
      //       toast.error(response.data.message);
      //     }
      //     break;
      //   }
      
      //   default:
      //     break;
      // }
      
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
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
