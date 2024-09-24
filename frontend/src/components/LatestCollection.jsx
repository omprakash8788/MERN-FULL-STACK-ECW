import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const {products} = useContext(ShopContext)
    // console.log(products);
    const [latestProducts, setLatestProducts]=useState([])

    // after that when ever this component get loaded then from the products data we have to load the 10 products in this latest products state. for that we will use useEffect hook

    useEffect(()=>{
        setLatestProducts(products.slice(0,10))

    },[products])
    
  return (
    <div className='my-10'>
        <div className='text-center'>
            <Title text1={'Latest'} text2={'Collection'}/>
           <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, possimus!</p>
        </div>
        {/* here we will add the logic using that we can display the recently added products, for that first we have to get the 10 products from the products data for that we  will store the 10 products from the products array in the state variable. */}
       
      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProducts.map((item, index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}  />
            ))
        }

      </div>
    </div>
  )
}

export default LatestCollection
