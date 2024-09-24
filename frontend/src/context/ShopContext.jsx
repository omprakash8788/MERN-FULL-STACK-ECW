import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'


// 1. create
export const ShopContext = createContext();

//2 create context provider function
const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backenUrl = import.meta.env.VITE_BACKEND_URL ;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts]=useState([])
  // For Login 
  // So when we will authenticated then we will get the token and we will store them in this token state variable.
  const [token , setToken]=useState('');

  const navigate =useNavigate();


  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  // 1. create function for get cart count
  const getCartCount = () => {
    let totalCount = 0;
    // this is for in loop
    // first for loop help us to extract the items
    for (const items in cartItems) {
      // add another for in loop
      // second for loop itrate the product size
      for (const item in cartItems[items]) {
        // after that use the try catch block
        try {
          // if condition  - here  "cartItems[items][item]>0" it means in the cart item we have the product with the particular size, in that case we will increase the count
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  // here we will create one update function using that clear the cart data or we can also modified the cart items
  const updateQuantity = async (itemId, size, quantity) => {
    // after that when we have created the addToCart function there we are taking the itemId and size, so in this update quantity we will take itemId, size, and quantity

    // first we will create the copy of the cartItem
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity; // so our cart data will be modified
    // and we will set cart data in the cartItems state
    setCartItems(cartData);
  };

  //  Total cart amount logic
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

 const getProductsData = async()=>{
  try {
    // call the api
    const response = await axios.get(backenUrl + '/api/product/list')
    // console.log(response.data);
    // After that we will store this product data in products state variable.
    // first, we check condition if response.data.success is true then we store that data in setProducts setter function.
    if(response.data.success){
      setProducts(response.data.products)
    }
    // if condition is false 
    else{
      toast.error(response.data.message)
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
    
  }
 }

//  After that call the getProductsData  function
useEffect(()=>{
 getProductsData();
},[])

// To prevent login page - so when we refreash web page , our token will not removed
useEffect(()=>{
  // Add the condition - if the token is not avaliable and in the local storage token is avaliable in that case we will store local storage token in the token state variable 

  if(!token && localStorage.getItem('token')){
       setToken(localStorage.getItem('token'))
  }
},[])


  const value = {
    // when ever we will add any variable or state or function with in this value object we can access it any component using the context API
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate, 
    backenUrl,
    token,
    setToken
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
