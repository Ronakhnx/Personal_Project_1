//require("dotenv").config({path:"./env"});
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

connectDB();



















/* (async () => {
   try {
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
   } catch (error) {
     console.error("Error:", error);
     throw error;
   }
 })();*/
