import express from "express";
import { fetchDashboardStats, fetchInvoices, updateInvoiceStatus, uploadInvoice } from "../controllers/invoiceController.js";
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/auth.js";

const invoiceRouter = express.Router();

invoiceRouter.post("/upload", upload.single("file"),authUser, uploadInvoice);
invoiceRouter.get("/invoice",authUser,fetchInvoices);
invoiceRouter.get("/dashboard",authUser, fetchDashboardStats);
invoiceRouter.put("/:id",authUser ,updateInvoiceStatus);

export default invoiceRouter;