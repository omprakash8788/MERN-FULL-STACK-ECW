import express from 'express'

import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

// create router
const userRouter = express.Router(); // using this router we will create one get and post method

// so first we will create user post method, and we will mount on register endpoint
userRouter.post("/register", registerUser)
// second we will create user logic post method
userRouter.post("/login", loginUser)
// third we will create admin  post method
userRouter.post("/admin", adminLogin)


export default userRouter;

// Now using this router we will create the endpoints
// After that open server.js file 



