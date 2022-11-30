import express from "express";
import "dotenv/config";
import loginRoutre from "./router/loginRoutre";
import { connectDB } from "./config/db";

const app = express();

connectDB();

app.use(express.json());

app.use("/auth", loginRoutre);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`The server running in port ${PORT}`);
});