import { useEffect, useState } from "react";
import axios from "axios";
import { FileText } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const ChartsSection = ({ invoices }) => {
  // ---------------- Status Distribution ----------------
  const statusData = invoices.reduce((acc, invoice) => {
    acc[invoice.status] = (acc[invoice.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusData).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  // ---------------- Top Vendors (by Amount) ----------------
  const vendorData = invoices.reduce((acc, invoice) => {
    acc[invoice.vendor] =
      (acc[invoice.vendor] || 0) + parseFloat(invoice.amount);
    return acc;
  }, {});

  const barData = Object.entries(vendorData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([vendor, amount]) => ({
      vendor: vendor.length > 15 ? vendor.substring(0, 15) + "..." : vendor,
      amount: amount,
    }));

  // ---------------- Summary Stats ----------------
  const totalInvoices = invoices.length;

  // Duplicate detection
  const seen = new Set();
  let duplicates = 0;
  invoices.forEach((inv) => {
    const key = `${inv.vendor}-${inv.amount}-${inv.date}`;
    if (seen.has(key)) {
      duplicates++;
    } else {
      seen.add(key);
    }
  });

  // Estimated savings (2% rule)
  const savings = invoices.reduce((acc, inv) => {
    if (parseFloat(inv.amount) > 50000) {
      acc += parseFloat(inv.amount) * 0.02;
    }
    return acc;
  }, 0);

  const data = [
    { metric: "Total Invoices", value: totalInvoices },
    { metric: "Duplicates", value: duplicates },
    // { metric: "Savings (₹)", value: parseFloat(savings.toFixed(2)) },
  ];

  // ---------------- Average Invoice per Vendor ----------------
  const vendorAvg = invoices.reduce((acc, invoice) => {
    if (!acc[invoice.vendor]) {
      acc[invoice.vendor] = { total: 0, count: 0 };
    }
    acc[invoice.vendor].total += parseFloat(invoice.amount);
    acc[invoice.vendor].count += 1;
    return acc;
  }, {});

  const avgVendorData = Object.entries(vendorAvg)
    .map(([vendor, { total, count }]) => ({
      vendor: vendor.length > 15 ? vendor.substring(0, 15) + "..." : vendor,
      avg: total / count,
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 10);

  // ---------------- Chart Colors ----------------
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Invoice Status Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Top 10 Vendors by Amount
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="vendor"
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip
              formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
            />
            <Bar dataKey="amount" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Key Invoice Metrics
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => {
                if (name.includes("Savings")) {
                  return [`₹${value.toFixed(2)}`, name];
                }
                return [value, name];
              }}
            />
            <Bar dataKey="value">
              {data.map((entry, index) => {
                const colors = ["#3B82F6", "#EF4444", "#10B981"]; // blue, red, green
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Average Vendor Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Average Invoice Amount per Vendor
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={avgVendorData}
            layout="vertical"
            margin={{ left: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis dataKey="vendor" type="category" width={100} fontSize={12} />
            <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, "Avg"]} />
            <Bar dataKey="avg" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
