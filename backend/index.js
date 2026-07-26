import express from "express";
import mongoose from "mongoose";
//import dotenv from "dotenv";
import cors from "cors";
import bookrouter  from "./routes/book.route.js";
import { PORT , MONGO_URI } from "./config.js";


const app = express();

//Middleware
app.use(express.json()); //This middleware is used to parse the incoming JSON data in the request body and make it available in req.body
app.use(express.urlencoded({extended: true})); //This middleware is used not to parse the incoming Form Url data in the request body and make it available in req.body
app.use(cors()); //This is used to enable Cross-Origin Resource Sharing (CORS) for the API, allowing requests from different origins.Here if paramerters of cors() is not passed, it will allow all origins to access the API. 

//We cant use the below code as we are using different IP for Frontend, so we have enabled defualt "app.use(cors());".
// app.use(
//     cors({
//         origin: `http://localhost:${PORT}`, // Replace with your frontend URL , Careful we have used ` `(ie backtick) instead of "  " because we are using template literals to insert the PORT variable into the string. 
//         methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//         allowedHeaders: ["Content-Type"], // Allowed headers , we can also add "Authorization" if we want to send JWT token in the request header
//     })
// )                //If you want to restrict access to specific origins, you can pass an options object to cors() with the allowed origins.


//routes
app.use("/books",bookrouter);


app.get("/", (req, res) => {
    console.log("GET request received at /");
    return res.status(234).send("Welcome to the Bookstore API");
});




mongoose.connect(MONGO_URI)
.then
(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);  // we have used ` `(ie backtick) instead of "  " because we are using template literals to insert the PORT variable into the string.
});
})
.catch((err) => { //If Connection to MongoDB Atlas is not made, this catch block will execute and log the error to the console
    console.error('Error connecting to MongoDB', err);
});
