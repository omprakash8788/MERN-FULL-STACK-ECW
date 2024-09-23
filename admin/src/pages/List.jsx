import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
const List = ({token}) => {
  // First get data from the Apis and store in one state variable
  const [list, setList]=useState([]);
  console.log(list);
  

  const fetchList = async()=>{
    // After that add the logic to get the api and fetch the all products.
    try {
      const response = await axios.get(backendUrl + "/api/product/list"); // in this one we will store the api response

       if(response.data.success){
        // So when "(response.data.success) is true " then we will add products data in setList setter function.

        // After that we will store this product inside list state.
        setList(response.data.products)
       }
       else{
        // If condition is failds
        toast.error(response.data.message)
       }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }

  }

  // Delete Product
  const removeProduct = async (id)=>{
    // id - this is, we are getting from the mapping.
    // so whenever this function will be excauted we will remove that product from the database using this id.
    try {
      // In try block we will call the Api
      const response = await axios.post(backendUrl + "/api/product/remove", {id}, {headers:{token}})
      // {id} - In body we send product id
      // So, this is one of admin features so we have to provide token, for that in headers we pass token as a props.
      // After that we will check condition 
      if(response.data.success){
        toast.success(response.data.message)
        // After that we have to update the product list again for that call the fetchList() function
        await fetchList();


      }
      // if condition is false.
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);


      
      
    }


  }

  useEffect(()=>{
    fetchList();

  },[])
  return (
    <>
    <p className='mb-2'>All Products List</p>
    <div className='flex flex-col gap-2'>
      {/*  --------- List Table ---------- */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Prize</b>
        <b className='text-center'>Action</b>
      </div>
      {/* ---------- Product List -------- */}
      {
        list.map((item , index)=>(
          <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' >
            <img className='w-12' src={item.image[0]} alt="images" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            {/*We have to decleadred currency also , for that Open App.jsx */}
            <p>{currency}{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default List