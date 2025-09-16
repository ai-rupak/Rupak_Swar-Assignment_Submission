import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, FileText } from "lucide-react";
// Invoice Table Component
const InvoiceTable = ({ invoices, onUpdateStatus }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: null },
      'Approved': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Rejected': { color: 'bg-red-100 text-red-800', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig['Pending'];
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {IconComponent && <IconComponent size={12} className="mr-1" />}
        {status}
      </span>
    );
  };

  const ActionButtons = ({ invoice }) => (
    <div className="flex space-x-2">
      <button
        onClick={() => onUpdateStatus(invoice._id, 'Approved')}
        className="px-3 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={invoice.status === 'Approved'}
      >
        Approve
      </button>
      <button
        onClick={() => onUpdateStatus(invoice._id, 'Rejected')}
        className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={invoice.status === 'Rejected'}
      >
        Reject
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Invoice Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr 
                key={invoice._id} 
                className={`${invoice.isDuplicate ? 'bg-red-50' : 'hover:bg-gray-50'} transition-colors`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.vendor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{parseFloat(invoice.amount).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(invoice.status)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                  <div className="space-y-1">
                    {invoice.isDuplicate && (
                      <div className="flex items-center text-red-600">
                        <AlertTriangle size={14} className="mr-1" />
                        <span className="text-xs">Duplicate Invoice</span>
                      </div>
                    )}
                    {invoice.discountSuggestion && (
                      <div className="text-xs text-blue-600">
                        💡 {invoice.discountSuggestion}
                      </div>
                    )}
                    {invoice.approvalNote && (
                      <div className="text-xs text-gray-600">
                        📝 {invoice.approvalNote}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ActionButtons invoice={invoice} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {invoices.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No invoices found. Upload a file to get started.</p>
        </div>
      )}
    </div>
  );
};
export default InvoiceTable;
