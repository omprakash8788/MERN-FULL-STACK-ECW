import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';

// Placing order using COD method.

const placeOrder = async (req, res)=>{
    try {
        // in try block we will get the userid, amount, address, items, from the req body
        const {userId, items, amount, address}=req.body;
        // Whenever we will create the request then this items amount and address will be send from the body and we will also send the token in the headers using that we can get the userId, using the auth.js middleware.

        // After that we will create orderdata
        const orderData= {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        // Now using this orderData we will create new orders
        const newOrder = new orderModel(orderData)
        // After that save this in database.
        await newOrder.save();
        // Now whenever the order is saved we have to clear cartData of userId
        await userModel.findByIdAndUpdate(userId, {cartData:{}})
        //  {cartData:{}} <-- here we provide cartData with empty object so our cartData reset.
        // Note- cartData variable we are define inside cartController.js
        // Now order has been placed and save in database then we have clear the cartData.
        // After that we will generate one response
        res.json({success:true, message:"Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }


}


// Placeing order using Stripe method
const placeOrderStripe = async (req, res)=>{
    
}


// Placeing order using razor pay method
const placeOrderRazorPay = async (req, res)=>{
    
}


// After that create controller function using that we can display all the orders on our admin panel

// All orders data for admin panel.
const allOrders = async (req, res)=>{
    
}


// user order data for frontend
const userOrders = async (req, res)=>{
    
}


// update order status from Admin panel (Only admin can update the order status)
const updateStatus = async (req, res)=>{
    
}

// After that we will export these function.
export {placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus}
