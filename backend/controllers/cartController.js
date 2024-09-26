import userModel from "../models/userModel.js";

// add products to user cart
const addToCart = async(req, res)=>{
 try {
    // first, we will get the user id from the request . body
    //userId =  We will get this userId from the token_decode it will be added in the body

    // itemId = so, the itemId is basically the product id that we are trying to add in our cart.
    


    const {userId, itemId, size}= req.body;
    // After that using this userId from the userModel find the user and we will modify that cart data.
    const userData = await userModel.findById(userId); // using this we will get particular user data in that userData variable.
    // After that userData variable we will extract the cart data
    let cartData = await userData.cartData;
    // After that check condition
    if(cartData[itemId]){
        // if cartData has this itemId available, then add one more if statement
        if(cartData[itemId][size]){
            // if this cartData with itemId, and for this size already entry is available in that case we will add quantity 1
            cartData[itemId][size] += 1
        }
        // if size is not available
        else{
            cartData[itemId][size]=1;
        }
    }
    else{
        cartData[itemId] = {}
        // In this object we will create the size
        cartData[itemId][size]=1
    }
    // Now we have to updated cartData in the userData for that we use the userModel
    await userModel.findByIdAndUpdate(userId, {cartData})

    // After that generate one response
    res.json({success:true, message:"Added to Cart"})

    
 } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
    
    
 }

}

// update user cart
const updateCart = async(req, res)=>{
    

}

// get user cart data
const getUserCart = async(req, res)=>{
    

}


export {addToCart, updateCart, getUserCart}