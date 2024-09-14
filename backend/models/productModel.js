import mongoose from 'mongoose'

// create schema for product
const productSchema= new mongoose.Schema({
    // here we will define the obj and properties and there types
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    bestSeller:{
        type:Boolean,
    },
    date:{
        type:Number,
        required:true
    },
  

})

// Now using this schema we will create model
const productModel = mongoose.models.product || mongoose.model("product", productSchema);
// so what happend here when the productModel is already avaliable then that model will be use and if it is not avaliable then it will create new model using this " mongoose.model("product", productSchema);" schema 

export default productModel;


