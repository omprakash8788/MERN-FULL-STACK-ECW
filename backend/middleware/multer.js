import multer from "multer";

// here we will create the storage configuration
const storage = multer.diskStorage({
    // here we define the file name property
    filename:function(req, file, callback){
        // here simply called the callback function
        callback(null, file.originalname); // here we passing two parameters null, and file.

    }
})

// using this deskStorage we will create one upload middleware
const upload = multer({
    storage
})

export default upload;

// So we have created the middleware.
// Now we will use this in productRoute.js