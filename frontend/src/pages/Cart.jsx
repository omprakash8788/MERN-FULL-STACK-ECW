import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontendassets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  // here first we get the products data, currency, size, cartItems state from the context api
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  // Now we will change the data into array formate
  const [cartData, setCartData] = useState([]);
  // console.log(cartData);

  useEffect(() => {
    if(products.length > 0 ){
       // here add the logic so that when ever the cart page will be loaded then the products data and cartItems data will be combine together to create one array and we will store in this "cartData" state variable.
    const tempData = [];
    // after that run for in loop
    for (const items in cartItems) {
      //run anothor for in loop
      for (const item in cartItems[items]) {
        // in for in loop we will get the data cartItems data and quantity
        // we will store those data into one object and we will add in this array "setCartData]=useState([])",
        if (cartItems[items][item] > 0) {
          // in that case we will add the data in the array
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    // console.log(tempData);
    // after that set the tempData into the cartData
    setCartData(tempData);
    }
   
    // In dependecy, we provides cartItems so when ever our cartItems will be updated then the setCartData function will be excauted.
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        {/* Mount here Title component */}
        <Title text1={"Your"} text2={"Cart"} />
      </div>

      <div>
        {/* in this div we display our product entry */}
        {cartData.map((item, index) => {
          // first find id
          const productData = products.find(
            (product) => product._id === item._id
          );
          console.log(productData);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency} {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              {/* here we will create one input filed */}
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-0 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="deleteicon"
              />
            </div>
          );
        })}
      </div>
      {/* mount here CartTotal component */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          {/* mount component here */}
          <CartTotal />
          {/* Another div - in this div we will create button tag */}
          <div className="w-full text-end">
            <button onClick={()=>navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">
              Proceed To CheckOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
