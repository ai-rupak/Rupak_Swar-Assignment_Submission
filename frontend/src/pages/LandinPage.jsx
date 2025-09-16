import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Smart Vendor Payment{" "}
          <span className="text-indigo-600">Automation Simulator</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto">
          Streamline your finance operations with automated invoice processing,{" "}
          <span className="font-semibold text-indigo-600">
            duplicate detection
          </span>
          , early-payment discount suggestions, and approval workflows — all in
          one intuitive dashboard.
        </p>

        {/* Call to action */}
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
        >
          🚀 Login to Dashboard
        </button>

        {/* Extra tagline */}
        <p className="mt-6 text-sm text-gray-500">
          Secure • Reliable • Scalable
        </p>
      </div>
    </div>
  );
}
