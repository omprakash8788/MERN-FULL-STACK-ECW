import mongoose from 'mongoose'

const connectDB = async()=>{
    mongoose.connection.on('connected', ()=>{
        console.log("mongoDB connected")
    })
    // Using this function we can add the logic to connect our mongodb 
    await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce`); // ecommerce is a database project name


}

export default connectDB;