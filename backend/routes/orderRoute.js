import express from 'express'

import {placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorPay} from '../controllers/orderController.js'

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

// After that create orders router
const orderRouter = express.Router()

// After that we will use controller function and orderRouter to create multiple endpoints

// Admin features
orderRouter.post('/list',adminAuth ,allOrders) // This route for the admin panel. using this we can get the all orders details and we will display on the admin panel.
// adminAuth - For admin authentication
orderRouter.post('/status',adminAuth ,updateStatus)


// payment features
orderRouter.post('/place',authUser ,placeOrder);
orderRouter.post('/stripe',authUser ,placeOrderStripe);
orderRouter.post('/razorpay',authUser ,placeOrderRazorPay);



// user features
orderRouter.post('/userorders', authUser, userOrders);

// verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorPay)



// After that export the orderRouter
export default orderRouter;





