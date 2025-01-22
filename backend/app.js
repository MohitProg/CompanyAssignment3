import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import cors from "cors";
import Emailtemplateroute from "./Routes/emailRoute.js";
import { db } from "./db/db.js";
const app = express();
const PORT = process.env.PORT||8000;

// middleware
app.use(cors());
app.use(express.static("uploads"));
app.use(express.json(urlencoded({extended:true})));



app.use("/api/email-temp", Emailtemplateroute);

db().then(() => {
  app.listen(PORT, () => {
    console.log("server is started ",PORT);
  });
});
