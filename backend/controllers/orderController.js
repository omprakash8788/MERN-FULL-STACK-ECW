

// Placing order using COD method.

const placeOrder = async (req, res)=>{

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
