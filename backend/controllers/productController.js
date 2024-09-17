import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"
// Function for Add product
const addProduct = async (req, res) => {

  try {
  
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    // After that we have to get the products image that we will get from the req.files
    const image1 = req.files.image1 && req.files.image1[0]; // here what we are doing simply we are checking if the image1 is available in the request files then we will store the image in the image1 variable.
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // After that upload the images on cloudinary storage and from thire we will get the url and we will store that url in our database.
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        //    so in this result we get secure url that will be our image url
        return result.secure_url;
      })
    );

  //Save the data in MongoDB
  const productData = {
    name,
    description,
    category,
    price:Number(price), // convert price into number
    subCategory,
    bestSeller:bestSeller === "true" ? true : false, // this data will converted into boolean.
    sizes: JSON.parse(sizes) ,// converting here into array
    image:imagesUrl,
    date:Date.now()
  }
  console.log(productData);
  const product = new productModel(productData);
  // now we will save this in database
  await product.save();
  

 res.json({success:true, message:"Product added"});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
  // After that test this Api , we are getting data or not
};

// Function for list products
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true, products})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    // Now we will created the functionality for the listProducts
};

// Function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Product removed"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
};

// Function for single product info
const singleProduct = async (req, res) => {
    // Using this we will get the information of the single product.
    try {
        // in this block we will get the product id from the req . body
        const {productId}=req.body; 
        // using thsi productId we will find the product and we will send the data as a response.
        const product = await productModel.findById(productId);
        // Now we send "product" variable as response
        res.json({success:true, product})

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
};

// Now we will export this function
export { listProducts, addProduct, removeProduct, singleProduct };
