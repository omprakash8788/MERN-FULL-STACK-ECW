import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const {currency, backenUrl, token } = useContext(ShopContext);
  //  using this backenUrl and token we will fatch the orders.
  // And after fatching we will store in state variable.
  const [orderData, setOrderData]=useState([])
  // After that instant of products.slice use orderData.

  const loadOrderData = async () =>{
    try {
      // In try block first we will add if condition to check response
      if(!token){
        // if token is not available
        return null;
      }
      // And when the token is available then we can use the token and fatch the order details.
      // After that here we will call the Api.
      const response = await axios.post(backenUrl + "/api/order/userorders", {}, {headers:{token}}  )
      //{}= in the body we dont have to send anythings so simply add the empty object {}
      // Then We have to send token in headers
      // After that check response result, in console
      // console.log(response.data);

      if(response.data.success){
        // if true
        let allOrdersItem = [];
        response.data.orders.map((order)=>{
          // Note- orders keyword is array name where our data is store , refer console pic to better understanding
          order.items.map((item)=>{
               // Note- items keyword is array name where our data is store , refer console pic to better understanding
              //  After that in this item we will add some property like status, payment, paymentMethod, and date. that we will get from the orders object.
              item['status']=order.status
              item['payment']=order.payment
              item['paymentMethod']=order.paymentMethod
              item['date']=order.date
              //In item we have added these four property.
              // After that we will save this item in the array
              allOrdersItem.push(item)

          }) 

        })
        // After that console the result 
        // console.log(allOrdersItem);
        // After that add allOrdersItem in setter function.
        setOrderData(allOrdersItem.reverse())
        // adding reverse method so latest order will be display.

        
      }
      
      
    } catch (error) {
      console.log(error);
      
      
    }
  }

  // We have to run this function whenever our page gets loaded.
  useEffect(()=>{
    loadOrderData();

    // In dependency we pass token so whenever the token will be update it will run this function 
  },[token])
 
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        {/* Mount Title component here */}
        <Title text1={"My"} text2={"Orders"} />
      </div>

      <div>
        {/*   {products.slice(1, 4).map((item, index) , instance of product.slice use orderData, orderData will be one array so we use use the map methods. */}
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-b text-gray-700 flex flex-col  md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              {/* in this div we will display product data */}
              <img className="w-16" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {currency} {item.price}
                  </p>
                  {/* <p>Quantity: 1</p> */}
                  <p>Quantity: {item.quantity}</p>

                  {/* <p>Size: M</p> */}
                  <p>Size: {item.size}</p>

                </div>
                {/* <p className="mt-2">
                  Date: <span className="text-gray-400">25, Aug,2024</span>
                </p> */}

                <p className="mt-2">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>

                <p className="mt-2">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            {/* another div */}
            <div className="md:w-1/2 flex justify-between">
            <div className="flex items-center gap-2">
              <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
              {/* <p className="text-sm md:text-base">Ready to ship</p> */}
              <p className="text-sm md:text-base">{item.status}</p>


            </div>
            <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
