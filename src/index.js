//require("dotenv").config({path:"./env"});
import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;
connectDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`server is running on port: ${port}`);
      });
    } catch (error) {
      console.log("server failed to connect", error);
    }
  })
  .catch((err) => {
    console.log("mongoDB connection failed !!!", err);
  });

/* (async () => {
   try {
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
   } catch (error) {
     console.error("Error:", error);
     throw error;
   }
 })();*/
