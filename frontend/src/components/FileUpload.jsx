import { Upload } from "lucide-react";
import { useState } from "react";

// File Upload Component
const FileUpload = ({ onUpload, isUploading }) => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
      
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Upload className="mr-2 text-blue-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">Upload Invoices</h2>
      </div>
      <div className="flex items-center space-x-4 gap-4 flex-wrap">
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};
export default FileUpload;