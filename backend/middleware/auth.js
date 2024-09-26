import jwt from "jsonwebtoken";

// auth user function
const authUser = async (req, res, next) => {
  // next is callback function
  // After that we will get user token from the headers
  const { token } = req.headers;

  // After that we will check the condition
  if (!token) {
    // if token not available , in that case we will return one response
    return res.json({ success: false, message: "Not Authorized Login again" });
  }
  // If the token is available
  try {
    // In try block we will decode the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // Now in this decoded token we will get the users id.

    // if you check userController.js file , so when we have create the token the we have added one object and in that object we have the users id, this next code is just refrence what i comment out.
    /*   
      const createToken = (id)=>{
       return jwt.sign({id},process.env.JWT_SECRET )
         }
    */
 //So, now we will get that user id from this token and we will save that in the req.body.userId property 
 req.body.userId  = token_decode.id   ; // using this body of request will add the userId property. That will get from this token "token_decode.id" 
//  After that we will call the next function
next()



  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
    
  }
};

export default authUser;
