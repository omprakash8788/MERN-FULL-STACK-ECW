// here we will create order model
import mongoose from 'mongoose'

// After that we will create the Schema for the order
const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
        // In items we will store the product data that we will orders
    },

    amount:{
        type:Number,
        required:true
    },

    address:{
        type:Object,
        required:true
    },

    status:{
        type:String,
        required:true,
        default:'Order Placed'
    },

    paymentMethod:{
        type:String,
        required:true
    },
    payment:{
        type:Boolean,
        required:true,
        default:false
    },
    date:{
        type:Number,
        required:true
    },
});

// Using this schema we will create one order model.
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
