import React, { useEffect, useState } from "react";
import ChartsSection from "../components/ChartsSection";
import axios from "axios";
import { FileText } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading,setLoading]= useState(false);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
       setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}invoices/invoice`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        setInvoices(res.data.invoices || []);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }finally{
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);
   const logout = ()=>{
    localStorage.removeItem('token');
    window.location.href="/login";
    toast.success('Logged out successfully');
  }


  if (!localStorage.getItem("token")) {
    return (window.location.href = "/login");
  }
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading"></div>
    </div>
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
              Vendor Payment Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Streamline your invoice processing and vendor payments
            </p>
          </div>
          <div className="flex justify-center md:justify-end items-center gap-4">
           
            
            <button onClick={logout} className="px-5 py-2 bg-black text-white font-medium rounded-lg text-sm shadow  focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105  transition duration-300">
              Logout
            </button>
            
          </div>
        </div>
        {invoices.length > 0 && <ChartsSection invoices={invoices} />}
      </div>
    </div>
  );
};

export default Dashboard;
