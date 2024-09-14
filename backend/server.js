import express from "express";
import cors from "cors";

import "dotenv/config"; // importing this we will getting support of dotenv file in our project.
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

//App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json()); // after provide this what ever request we will get that will be parse using this json()
app.use(cors()); // after adding this we can access the backend from any ip address.

// API endpoints
app.get("/", (req, res) => {
  res.send("API working");
});

// after that we will start the app server
app.listen(port, () => console.log("server started on port: " + port));
