import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import { FaTimesCircle } from "react-icons/fa";

export default function PaymentFailurePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorMsg = searchParams.get("error") || "Payment was cancelled or failed.";

  return (
    <div className="bg-[#F4F1EA] min-h-screen">
      <DynamicTitle title={"Payment Failed"} />
      <PageHeader title={"Payment Failed"} />

      <div className="container mx-auto max-w-7xl px-5 pt-20 pb-20">
        <div className="bg-white rounded-lg shadow-md p-12 text-center max-w-2xl mx-auto">
          <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-6">{errorMsg}</p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-3 bg-[#FC791A] text-white rounded-lg font-semibold hover:bg-[#e66a14] transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="px-6 py-3 border-2 border-[#FC791A] text-[#FC791A] rounded-lg font-semibold hover:bg-[#FC791A] hover:text-white transition-colors"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

