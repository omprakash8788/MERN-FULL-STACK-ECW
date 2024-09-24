import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  // 1. first get all the products data using context api
  const { products } = useContext(ShopContext);
  console.log(products);
  
  // console.log(products);
  // Now from this data we will get those data where the best seller property is true.
  // For that we will add one state variable
  const [bestSeller, setBestSeller] = useState([]);
  // bestSeller
  console.log(bestSeller);
  

  useEffect(() => {
    const bestProduct =  products.filter((item) => (item.
    bestSeller)
    ); // here if it is true then filter method will save the products data in this "bestProduct" variables

    // After that called the setter function
    console.log(bestProduct);
    
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
  // so, whenever this products is update thsn this function will be excauted and it is display the bestSeller products

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non,
          architecto.
        </p>
      </div>
      {/* Display products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {/* in this div we will use bestSeller state */}
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
