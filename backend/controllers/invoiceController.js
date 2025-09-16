import Invoice from "../models/Invoice.js";
import xlsx from "xlsx";

// API to upload and process invoice Excel file

const uploadInvoice = async (req,res)=>{
    try {
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json(sheet);

        let newInvoices = [];
        let duplicates = 0;
        let savings = 0;

        for (const row of rows) {
        const vendor = row["Vendor"];
        const amount = Number(row["Amount"]);
        const date = row["Date"];

        // Check for duplicates in DB
        const exists = await Invoice.findOne({ vendor, amount, date });
        let isDuplicate = false;
        let discountSuggestion = "";
        let approvalNote = "";

        if (exists) {
            isDuplicate = true;
            duplicates++;
        }

        // Discount rule
        if (amount > 50000) {
            discountSuggestion = "2% Early Payment Discount";
            savings += amount * 0.02;
        }

        // Approval rule
        if (amount > 100000) {
            approvalNote = "Manager approval required";
        }

        const invoice = new Invoice({
            vendor,
            amount,
            date,
            isDuplicate,
            discountSuggestion,
            approvalNote,
        });

        await invoice.save();
        newInvoices.push(invoice);
    }

    res.json({
      message: "Invoices uploaded",
      invoices: newInvoices,
      stats: {
        processed: newInvoices.length,
        duplicates,
        savings,
      },
    });

    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
}

// API to Fetch all invoices
const fetchInvoices = async(req,res)=>{
    try {
        const invoices = await Invoice.find();
        res.json({success:true,invoices});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});        
    }
}

// API for Dashborad stats
const fetchDashboardStats = async(req,res)=>{
    const total = await Invoice.countDocuments();
    const duplicates = await Invoice.countDocuments({ isDuplicate: true });

    const allInvoices = await Invoice.find();
    const savings = allInvoices.reduce((sum, inv) => {
        if (inv.discountSuggestion) {
        return sum + inv.amount * 0.02;
        }
        return sum;
    }, 0);

    res.json({ total, duplicates, savings });
    };

// API to update invoice status
const updateInvoiceStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
        const invoice = await Invoice.findByIdAndUpdate(
            id,
            {status},
            {new:true}
        );
        if(!invoice){
            return res.json({success:false,message:"Invoice not found"});
        }
        res.json({success:true,message:"Invoice status updated",invoice});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});        
    }
};
export {uploadInvoice,fetchInvoices ,fetchDashboardStats,updateInvoiceStatus};