import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Upload,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  LogOut,
} from "lucide-react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import StatsCards from "../components/StatsCards";
import InvoiceTable from "../components/InvoiceTable";
import ChartsSection from "../components/ChartsSection";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Main Analytics Component
const Analytics = () => {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({ total: 0, duplicates: 0, savings: 0 });
  const [isUploading, setIsUploading] = useState(false);

  // API Functions
  const handleFileUpload = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/api/invoices/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      //   const res = await apiService.uploadFile(file);

      toast.success(res.data.message);
      await Promise.all([fetchInvoices(), fetchStats()]);
      
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      // Replace this mock call with your actual axios call:
      const res = await axios.get("http://localhost:5000/api/invoices/invoice",{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // const res = await apiService.fetchInvoices();
      setInvoices(res.data.invoices || []);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const fetchStats = async () => {
    try {
      // Replace this mock call with your actual axios call:
      const res = await axios.get(
        "http://localhost:5000/api/invoices/dashboard",
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      setStats(res.data);
    } catch (error) {
      toast.error("Error fetching stats: " + error.message);
      console.error("Error fetching stats:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      // Replace this mock call with your actual axios call:
      const updateResponse = await axios.put(
        `http://localhost:5000/api/invoices/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
     
      toast.success(updateResponse.data.message);
      await fetchInvoices();
    } catch (error) {
      toast.error("Update failed: " + error.message);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchStats();
  }, []);

  const logout = ()=>{
    localStorage.removeItem('token');
    window.location.href="/";
    toast.success('Logged out successfully');
  }

  if(!localStorage.getItem('token')){
    return (
      window.location.href="/login"
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex justify-center md:justify-start items-center">
              <FileText className="mr-2 text-blue-600" size={30} />
              Vendor Payment Automation
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Streamline your invoice processing and vendor payments
            </p>
          </div>
          <div className="flex justify-center md:justify-end items-center gap-4">
            <Link to="/dashboard">
            <button className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
              Analytics Dashboard
            </button>
            </Link>
            
            <button onClick={logout} className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300">
              Logout
            </button>
            
          </div>
        </div>

        {/* File Upload */}
        <FileUpload onUpload={handleFileUpload} isUploading={isUploading} />

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Charts */}
        {/* {invoices.length > 0 && <ChartsSection invoices={invoices} />} */}

        {/* Invoice Table */}
        <InvoiceTable invoices={invoices} onUpdateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default Analytics;
