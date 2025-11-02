import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import Swal from "sweetalert2";
import api from "../../api/axios";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const tranId = searchParams.get("tran_id");
        const status = searchParams.get("status");
        const orderId = searchParams.get("order_id");

        if (status === "VALID") {
          // Verify payment with backend
          const response = await api.post("/payment/ssl-commerz-verify", {
            tran_id: tranId,
            order_id: orderId,
          });

          if (response.data?.success) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `
                <p>Your payment has been processed successfully.</p>
                <p><strong>Order ID:</strong> ${orderId || "N/A"}</p>
                <p><strong>Transaction ID:</strong> ${tranId || "N/A"}</p>
              `,
              confirmButtonText: "View Orders",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/dashboard/myOrders");
              } else {
                navigate("/menu");
              }
            });
          } else {
            throw new Error("Payment verification failed");
          }
        } else {
          throw new Error("Payment failed or cancelled");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        Swal.fire({
          icon: "error",
          title: "Payment Verification Failed",
          text: "There was an issue verifying your payment. Please contact support if you were charged.",
          confirmButtonText: "Go to Orders",
        }).then(() => {
          navigate("/dashboard/myOrders");
        });
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="bg-[#F4F1EA] min-h-screen">
      <DynamicTitle title={"Payment Success"} />
      <PageHeader title={"Payment Processing"} />

      <div className="container mx-auto max-w-7xl px-5 pt-20 pb-20 text-center">
        {verifying ? (
          <div className="bg-white rounded-lg shadow-md p-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FC791A] mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Verifying your payment...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Payment Processing Complete
            </h2>
            <p className="text-gray-600">Please wait while we verify your payment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

