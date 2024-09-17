import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js';


// create router 
const productRouter = express.Router(); // using this product router we will create multiple routes

//so, first we will create route for the product add.
productRouter.post('/add',upload.fields([{name:'image1', maxCount:1}, {name:'image2', maxCount:1}, {name:'image3', maxCount:1}, {name:'image4', maxCount:1}]), addProduct); // "/add" is a path, and addProduct is a function
productRouter.post('/remove', removeProduct); 
productRouter.post('/single', singleProduct); 
productRouter.get('/list', listProducts);

// After that we have export the function
export default productRouter;