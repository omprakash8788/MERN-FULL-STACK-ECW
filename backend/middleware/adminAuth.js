// To create Admin authentication first import jwt
import jwt from 'jsonwebtoken'


// Admin auth
const adminAuth=async(req, res, next)=>{
    // next function like callback function
    try {
        // first we will get the token from the user request header 
        const {token} = req.headers;
        // So whenever we will called the Api from the admin auth so in the headers  "const {token} = req.headers;" will add the token that we are getting from the admin login 
        
        // After getting the token, now we will check if the token is available in that case we will continue.Else we will generate one respone that our user is not authorize to access the Api.
        if(!token){
            return res.json({success:false, message:"Not Authorized Login Again"});

        }
        // If token is available decode the token
        const tokenDecode= jwt.verify(token, process.env.JWT_SECRET); 
        // After that we will check tokenDecode is equal to admin email + admin password, then we will verify and which token will be geniune.
        if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            // if this tokenDecode is not match with this string "process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD" , its means the user is not authorize. In that case we will generate one response.
            return res.json({success:false, message:"Not Authorized Login Again"});

        }
        // And if our token match then we called our callback function that is next()
        next();
        
    } catch (error) {
        // If we get error then console this
        console.log(error)
        // then generate one response for error
        res.json({success:false, message:error.message})
        
    }
    // Now we have create the admin auth middleware , now we will export this

}

export default adminAuth;
// After that we will add this middleware in productRoute.js
