import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";

import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

const PORT_NUMBER = process.env.PORT || 4000;

app.listen(PORT_NUMBER, () => {
  connectDB();
  console.log(`Server is running on port: ${PORT_NUMBER}`);
});
