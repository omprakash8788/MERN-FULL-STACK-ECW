import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontendassets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  // console.log(productId);
  // for first we get data from context api
  const { products, currency, addToCart} = useContext(ShopContext);
  // we will store the particular product in one state variable
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize]=useState("");

  // after that here we will create one function with the name fetchProductData
  const fetchProductData = async () => {
    // to store the product data in the state variable first we need to find the product.
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        // console.log(item);
        setImage(item.image[0]); // so when ever we find any product we will store thire first image in the image state.

        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              // 'image' is a array where we get all images
              productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  src={item}
                  alt="image"
                />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            {/* this is a image state , dont confuse here */}
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* here we will display the product information */}
        {/* -------- Product Information -------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122)</p>

          </div>
          <p className="mt-5 text-3xl font-medium">{currency} {productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
               {
                productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' :''}`} key={index}>{item}</button>
                ))
               }
            </div>
          </div>
          {/* button */}
          <button onClick={()=>addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">Add To Cart</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
           <p>100% Original product.</p>
           <p>Cash on delivery is available on this product.</p>
           <p>Easy return and exchange policy within 7 days</p>
          </div>

        </div>
      </div>
      {/* ---------- description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-4 py-3 text-sm">Description</b>
          <p className="border px-4 py-3 text-sm">Reviews (130)</p>
        </div>
        {/* description box */}
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>An ecommerce website is an online plateform that facilitates the buying and sealing products online.</p>
            <p>Ecommerce website typically display products or services along with details </p>
        </div>
      </div>
      {/* ---- display related products ------- */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />


    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
