import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProduct = ({ category, subCategory }) => {
  //1 category, subCategory using this we will display the related product

  //2 after that we will add all product data from context api
  const { products } = useContext(ShopContext);
  // 3. after that we will create one state variable with the name realted
  const [related, setRelated] = useState([]);
  // console.log(related);

  //4 after that use useEffect hook
  useEffect(() => {
    // in this we can write the logic for filter product. using the category and subCategory
    // first check product lenght > 0 then only excaute the filter
    if (products.length > 0) {
      // here first we create the copy of all the products
      let productCopy = products.slice(); //  it will create all copy of products

      // on productCopy we will apply filter method
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subCategory === item.subCategory
      );

      // check productData
      //    console.log(productCopy.slice(0,5));
      // set productData into setRelated state
      setRelated(productCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related"} text2={"Products"} />
      </div>
      {/* another div - to display  all data */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
