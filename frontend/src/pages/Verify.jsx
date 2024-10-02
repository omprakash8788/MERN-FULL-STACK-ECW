import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    
    const {navigate, token, setCartItems, backenUrl}= useContext(ShopContext);
    const [searchParams, setSearchParams]= useSearchParams()

    // after the we have extract sucess and orderId property 
    const success = searchParams.get('success') // here we will get true/false
    const orderId = searchParams.get('orderId') // here we will get orderId

   // After that we will create verifyPayment function 
    const verifyPayment = async(req, res)=>{
        // after that from this parameter ("http://localhost:5173/verify?success=true&orderId=66fd4e77fa088f60a258c5c6") you can see success is true and orderId so from this parameter we have to get the params 
     
        try {
            if(!token){
                // if token is not available in that case we will return null
                return null;

            }
            const response = await axios.post(backenUrl + "/api/order/verifyStripe", {success, orderId}, {headers:{token}})
            // {success, orderId} => body we are adding success and orderId

            // {headers:{token}} = Add token in headers 

            // check response
            if(response.data.success){
                // if true then verify the payment
                setCartItems({}) // cart data will be clear
                // After that navigate to user on orders page
                navigate('/orders')
            }
            else{
                // if payment is failed, then send user to cart page.
                navigate('/cart')


            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
            
        }

    }

    // Run the function
    useEffect(()=>{
        verifyPayment();
    },[token])

  return (
    <div>

    </div>
  )
}

export default Verify