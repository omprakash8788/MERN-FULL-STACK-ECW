import userModel from "../models/userModel.js";

// add products to user cart
const addToCart = async (req, res) => {
  try {


    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId); // using this we will get particular user data in that userData variable.
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      }
      else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId); // using this we will get particular user data in that userData variable.
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity; // using that it will update the product quantity and cart data
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get user cart data
const getUserCart = async (req, res) => {
    try {
        // first, we will get user id request from body
        const {userId}=req.body;
        // using this user id we will find the user and thier cart data and will be store the cart data in the variable.
        const userData = await userModel.findById(userId); // using this we will get particular user data in that userData variable.
        let cartData = await userData.cartData;

        // res.json({success:true, cartData:userData.cartData})
        res.json({success:true, cartData})
        // Both is similar concept.


        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
};

export { addToCart, updateCart, getUserCart };
