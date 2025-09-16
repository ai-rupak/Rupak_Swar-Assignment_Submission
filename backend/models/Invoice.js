import mongoose from "mongoose";

// Invoice schema
const invoiceSchema = new mongoose.Schema({
  vendor: String,
  amount: Number,
  date: String,
  status: { type: String, default: "Pending" },
  isDuplicate: { type: Boolean, default: false },
  discountSuggestion: String,
  approvalNote: String,
});
export default mongoose.model("Invoice", invoiceSchema);