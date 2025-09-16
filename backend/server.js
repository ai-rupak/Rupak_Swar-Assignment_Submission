import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import invoiceRouter from "./routes/invoiceRoute.js";
import cors from "cors";
import dotenv from "dotenv";

connectDB();

const app = express();
app.use(express.json());
// dot env config
dotenv.config();

app.options("*", cors());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/invoices", invoiceRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

//   ======= Uncomment this to run server locally =======
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
