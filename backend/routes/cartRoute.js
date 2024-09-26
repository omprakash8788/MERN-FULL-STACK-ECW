import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

// create router
const cartRouter = express.Router();


// So whenever end user get the cart or update the cart or add the product then we will add the middleware.

cartRouter.post("/get", authUser,  getUserCart);
cartRouter.post("/add",authUser, addToCart);
cartRouter.post("/update",authUser, updateCart);
// Now suppose that anyone hit this Api endpoint then the token we will verify and using that token in the body we will get the user id.

export default cartRouter;
