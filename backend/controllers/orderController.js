import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe";

import razorpay from 'razorpay'


// global variables
const currency = "inr";
const deliveryCharge = 10;

// 1. gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Now we can use this stripe in our project.

// 1. razorpay initialize
const razorpayInstance = new razorpay({
  // here we will defined key id and key secret.
  key_id: process.env.Razorpay_key_id,
  key_secret: process.env.Razorpay_key_secret
})
// Now we can use this in our project.



// Placing order using COD method.

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    // Now using this orderData we will create new orders
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placeing order using Stripe method
const placeOrderStripe = async (req, res) => {
  // using this we can placed the order with stripe payment method.
  try {
    // here we get product data from req . body
    const { userId, items, amount, address } = req.body;
    // After that we need the origin url,
    const { origin } = req.headers;
    // {origin} = we get this from headers
    //So, whenever we create any req then in the headers this origin property will be created. where it include the frontend url.
    // Suppose we are placing the order from the our website then this "http://localhost:5173/orders" origin will be local host 5173.

    // After that we create the order data.

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    // Next we creating order data using this orderData.

    // Now using this orderData we will create new orders
    const newOrder = new orderModel(orderData);
    await newOrder.save(); // save in database

    //   After placing the order we will create one line items, using that we can excaute the payment method.
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // After that we will add delivery charges
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    // After that create new session.
    const session = await stripe.checkout.sessions.create({
      // here we will defined the success url and cancel url.
      // if payment is successful then we will redirect to success page.
      // and if the payment is fail or cancel then we will be redirected to the cancel url.
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe 
const verifyStripe = async (req, res)=>{
    // In this function we will get the usersId , user orders id and success property
    const {orderId, success, userId} = req.body;
    // {orderId, success, userId} => we will get this three item from req.body
    
    try {
        // In this one we will verify if the "success" is true in that case we will changed the payment status to true for this "orderId"
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {
              payment:true});
            // After that we will clear the cart data of user from UI side.
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            // {cartData:{}} => this will help to empty cart.
            
            // After that we will generate one response
            res.json({success:true});
        }
        else{
            // if payment is failed
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }


        
    } catch (error) {
        console.log(error);
        
        
    }

}

// Placeing order using razor pay method
const placeOrderRazorPay = async (req, res) => {
     try {
      // first we will Destructuring the orders details
        // here we get product data from req . body
    const { userId, items, amount, address } = req.body;
   

    // After that we create the order data.

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    // Next we creating order data using this orderData.

    // Now using this orderData we will create new orders
    const newOrder = new orderModel(orderData);
    await newOrder.save(); // here we save in database.

    // After we will create one option using that we can execute the payment of razorpay.
    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()
    }
    // After that using this options we will create a new order of razorpay.
    await razorpayInstance.orders.create(options, (error, order)=>{
        if(error){
         console.log(error);
         return res.json({success:false, message:error})
         
        }
        // after that we have dont any error then we will generate one res
        res.json({success:true, order})

    })
      
     } catch (error) {
      console.log(error);
    res.json({ success: false, message: error.message });

      
      
     }

};

// After that create controller function using that we can display all the orders on our admin panel

// All orders data for admin panel.
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// user order data for frontend
const userOrders = async (req, res) => {
  // inside we write logic to get order data from backend.
  try {
    // For reference  -> we can see here inside orderRoute.js
    // user features
    //  orderRouter.post('/userorders', authUser, userOrders); using this we can find user particular order details.

    // Now write our actual logic
    // So, within this try block we will get the userId from req . body
    const { userId } = req.body;
    // After that using this userId we can find all the orders.
    const orders = await orderModel.find({ userId });
    // After that we will get the orders in orders array variables
    // After that we will save this as a response.
    res.json({ success: true, orders });
  } catch (error) {
    // if any error
    console.log(error);
    res.json({ success: false, message: error.message });
  }
  // Now we have added this userOrders controller function at this routes "orderRouter.post('/userorders', authUser, userOrders)"
  // And we will user this "/userorders" endpoints to display the orders on our frontend.
};

// update order status from Admin panel (Only admin can update the order status)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// After that we will export these function.
export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
