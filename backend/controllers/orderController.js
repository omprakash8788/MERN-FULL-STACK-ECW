import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';

// Placing order using COD method.

const placeOrder = async (req, res)=>{
    try {
      
        const {userId, items, amount, address}=req.body;
     
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
        await newOrder.save();
      
        await userModel.findByIdAndUpdate(userId, {cartData:{}})
      
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
    try {
        const orders = await orderModel.find({})
       
        res.json({success:true, orders})

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})

        
    }
    
}


// user order data for frontend
const userOrders = async (req, res)=>{
    // inside we write logic to get order data from backend.
    try {
        // For reference  -> we can see here inside orderRoute.js 
        // user features
        //  orderRouter.post('/userorders', authUser, userOrders); using this we can find user particular order details.

        // Now write our actual logic
        // So, within this try block we will get the userId from req . body
        const {userId}=req.body;
        // After that using this userId we can find all the orders.
        const orders = await orderModel.find({userId})
        // After that we will get the orders in orders array variables
        // After that we will save this as a response.
        res.json({success:true, orders})

        
    } catch (error) {
        // if any error
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    // Now we have added this userOrders controller function at this routes "orderRouter.post('/userorders', authUser, userOrders)"
    // And we will user this "/userorders" endpoints to display the orders on our frontend.
    
    
}


// update order status from Admin panel (Only admin can update the order status)
const updateStatus = async (req, res)=>{
     
    try {
        // In this try block first we gets orders Id and status from the users
        const {orderId, status}=req.body
        // We have to send this "{orderId, status}" when we will hit the Api so add req.body
        // After that we will use orderModel to find the order and we will update the status 
        await orderModel.findByIdAndUpdate(orderId, {status})
        // {status} => we get this from req.body

        // Whatever status we send here "{orderId, status}" that will be save in the "(orderId, {status})" orderId, and it will be save in the database.

        // After that we will generate response.
        res.json({success:true, message:'Status Updated'})

        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
}

// After that we will export these function.
export {placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus}
