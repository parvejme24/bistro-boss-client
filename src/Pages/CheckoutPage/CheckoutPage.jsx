import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import Swal from "sweetalert2";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import api from "../../api/axios";
import { AuthContext } from "../../Provider/AuthProvider";
export default function CheckoutPage() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("ssl_commerz"); // 'ssl_commerz' or 'cod'
  const [processingPayment, setProcessingPayment] = useState(false);

  // Bangladesh Address states
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDivisionId, setSelectedDivisionId] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [loadingDivisions, setLoadingDivisions] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingUpazilas, setLoadingUpazilas] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const watchDivision = watch("division");
  const watchDistrict = watch("district");

  // Load divisions from API
  useEffect(() => {
    const loadDivisions = async () => {
      setLoadingDivisions(true);
      try {
        const response = await fetch("https://bdapi.vercel.app/api/v.1/division");
        const result = await response.json();
        
        if (result.success && result.data) {
          setDivisions(result.data);
        } else {
          console.error('Failed to load divisions:', result);
          setDivisions([]);
        }
      } catch (error) {
        console.error('Error loading divisions:', error);
        setDivisions([]);
      } finally {
        setLoadingDivisions(false);
      }
    };
    loadDivisions();
  }, []);

  // Load districts when division changes
  useEffect(() => {
    const loadDistricts = async () => {
      if (watchDivision) {
        // Find division ID from selected division name
        const selectedDiv = divisions.find(div => div.name === watchDivision);
        
        if (selectedDiv) {
          setSelectedDivision(watchDivision);
          setSelectedDivisionId(selectedDiv.id);
          setLoadingDistricts(true);
          
          try {
            const response = await fetch(`https://bdapi.vercel.app/api/v.1/district/${selectedDiv.id}`);
            const result = await response.json();
            
            if (result.success && result.data) {
              setDistricts(result.data);
            } else {
              console.error('Failed to load districts:', result);
              setDistricts([]);
            }
          } catch (error) {
            console.error('Error loading districts:', error);
            setDistricts([]);
          } finally {
            setLoadingDistricts(false);
          }
          
          // Reset district and upazila selections
          setSelectedDistrict("");
          setSelectedDistrictId("");
          setUpazilas([]);
          setValue("district", "");
          setValue("upazila", "");
        }
      } else {
        setDistricts([]);
        setSelectedDivisionId("");
      }
    };
    
    loadDistricts();
  }, [watchDivision, divisions, setValue]);

  // Load upazilas when district changes
  useEffect(() => {
    const loadUpazilas = async () => {
      if (watchDistrict && watchDistrict.trim() !== "") {
        // Find district ID from selected district name
        const selectedDist = districts.find(dist => dist.name === watchDistrict);
        
        if (selectedDist) {
          setSelectedDistrict(watchDistrict);
          setSelectedDistrictId(selectedDist.id);
          setLoadingUpazilas(true);
          
          try {
            const response = await fetch(`https://bdapi.vercel.app/api/v.1/upazilla/${selectedDist.id}`);
            const result = await response.json();
            
            if (result.success && result.data) {
              setUpazilas(result.data);
            } else {
              console.error('Failed to load upazilas:', result);
              setUpazilas([]);
            }
          } catch (error) {
            console.error('Error loading upazilas:', error);
            setUpazilas([]);
          } finally {
            setLoadingUpazilas(false);
          }
          
          // Reset upazila selection
          setValue("upazila", "");
        }
      } else {
        setUpazilas([]);
        setSelectedDistrictId("");
      }
    };
    
    loadUpazilas();
  }, [watchDistrict, districts, setValue]);

  // Load cart data
  useEffect(() => {
    fetch("cart.json")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading cart data:", error);
        setLoading(false);
      });

    // Pre-fill form if user is logged in
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phoneOne", user.phone || "");
    }
  }, [user, setValue]);

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateShipping = () => {
    return 120; // Fixed shipping charge of 120 taka
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  // Handle order submission
  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Cart is Empty",
        text: "Please add items to your cart before checkout.",
      });
      return;
    }

    setProcessingPayment(true);

    const orderData = {
      customerName: data.name,
      customerEmail: data.email,
      customerPhoneOne: data.phoneOne,
      customerPhoneTwo: data.phoneTwo || "",
      country: data.country || "Bangladesh",
      division: data.division,
      district: data.district,
      upazila: data.upazila,
      items: cartItems,
      subtotal: calculateSubtotal(),
      shipping: calculateShipping(),
      total: calculateTotal(),
      paymentMethod: paymentMethod,
      orderDate: new Date().toISOString(),
    };

    try {
      if (paymentMethod === "cod") {
        // Cash on Delivery - Direct order creation
        await handleCashOnDelivery(orderData);
      } else {
        // SSL Commerz payment
        await handleSSLCommerzPayment(orderData);
      }
    } catch (error) {
      console.error("Order error:", error);
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: error?.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  // Handle Cash on Delivery
  const handleCashOnDelivery = async (orderData) => {
    try {
      const response = await api.post("/orders", {
        ...orderData,
        status: "pending",
        paymentStatus: "pending",
      });

      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Order Placed Successfully!",
          html: `
            <p>Your order has been placed successfully.</p>
            <p><strong>Order ID:</strong> ${response.data._id || "N/A"}</p>
            <p>You will pay ${calculateTotal().toFixed(2)} when the order is delivered.</p>
          `,
          confirmButtonText: "View Orders",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard/myOrders");
          } else {
            navigate("/menu");
          }
        });
      }
    } catch (error) {
      throw error;
    }
  };

  // Handle SSL Commerz Payment
  const handleSSLCommerzPayment = async (orderData) => {
    try {
      // Create order first
      const orderResponse = await api.post("/orders", {
        ...orderData,
        status: "pending",
        paymentStatus: "pending",
      });

      if (!orderResponse.data) {
        throw new Error("Failed to create order");
      }

      // Initialize SSL Commerz payment
      const paymentResponse = await api.post("/payment/ssl-commerz-init", {
        orderId: orderResponse.data._id,
        amount: calculateTotal(),
        currency: "BDT",
        customerInfo: {
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhoneOne,
          phoneTwo: orderData.customerPhoneTwo,
          country: orderData.country,
          division: orderData.division,
          district: orderData.district,
          upazila: orderData.upazila,
        },
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/failure`,
        cancelUrl: `${window.location.origin}/payment/failure`,
      });

      if (paymentResponse.data?.GatewayPageURL) {
        // Redirect to SSL Commerz payment page
        window.location.href = paymentResponse.data.GatewayPageURL;
      } else {
        throw new Error("Payment gateway initialization failed");
      }
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F4F1EA] min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F4F1EA] min-h-screen">
        <PageHeader title={"Checkout"} />
        <div className="container mx-auto max-w-7xl px-5 pt-20 pb-20 text-center">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate("/menu")}
            className="inline-block mt-4 px-6 py-3 bg-[#FC791A] text-white rounded-lg font-semibold hover:bg-[#e66a14] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F1EA] min-h-screen">
      <DynamicTitle title={"Checkout"} />
      <PageHeader title={"Checkout"} />

      <div className="container mx-auto max-w-7xl px-5 pt-20 pb-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Customer Information & Payment Method */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A]"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A]"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number One */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number One *
                    </label>
                    <input
                      type="tel"
                      {...register("phoneOne", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10,11}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A]"
                      placeholder="Enter your phone number"
                    />
                    {errors.phoneOne && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phoneOne.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number Two */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number Two
                    </label>
                    <input
                      type="tel"
                      {...register("phoneTwo", {
                        pattern: {
                          value: /^[0-9]{10,11}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A]"
                      placeholder="Enter alternate phone number (optional)"
                    />
                    {errors.phoneTwo && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phoneTwo.message}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      {...register("country", { required: "Country is required" })}
                      defaultValue="Bangladesh"
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A] bg-gray-50"
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  {/* Division */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Division *
                    </label>
                    <select
                      {...register("division", { required: "Division is required" })}
                      disabled={loadingDivisions}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {loadingDivisions ? "Loading divisions..." : "Select Division"}
                      </option>
                      {divisions.map((division) => (
                        <option key={division.id} value={division.name}>
                          {division.name} {division.bn_name && `(${division.bn_name})`}
                        </option>
                      ))}
                    </select>
                    {errors.division && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.division.message}
                      </p>
                    )}
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District *
                    </label>
                    <select
                      {...register("district", { required: "District is required" })}
                      disabled={!selectedDivision || loadingDistricts}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {loadingDistricts 
                          ? "Loading districts..." 
                          : !selectedDivision 
                          ? "Select Division first" 
                          : "Select District"}
                      </option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.name}>
                          {district.name} {district.bn_name && `(${district.bn_name})`}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.district.message}
                      </p>
                    )}
                  </div>

                  {/* Upazila/Sub-district */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upazila/Sub-district *
                    </label>
                    <select
                      {...register("upazila", { required: "Upazila is required" })}
                      disabled={!selectedDistrict || loadingUpazilas}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC791A] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {loadingUpazilas 
                          ? "Loading upazilas..." 
                          : !selectedDistrict 
                          ? "Select District first" 
                          : "Select Upazila"}
                      </option>
                      {upazilas.map((upazila) => (
                        <option key={upazila.id} value={upazila.name}>
                          {upazila.name} {upazila.bn_name && `(${upazila.bn_name})`}
                        </option>
                      ))}
                    </select>
                    {errors.upazila && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.upazila.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* SSL Commerz */}
                  <div
                    onClick={() => setPaymentMethod("ssl_commerz")}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === "ssl_commerz"
                        ? "border-[#FC791A] bg-orange-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="radio"
                        checked={paymentMethod === "ssl_commerz"}
                        onChange={() => setPaymentMethod("ssl_commerz")}
                        className="w-5 h-5 text-[#FC791A]"
                      />
                      <FaCreditCard className="text-2xl text-[#FC791A]" />
                      <span className="font-semibold text-gray-800">
                        SSL Commerz
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Pay securely with card, mobile banking, or wallet
                    </p>
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#FC791A] bg-orange-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="radio"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="w-5 h-5 text-[#FC791A]"
                      />
                      <FaMoneyBillWave className="text-2xl text-[#FC791A]" />
                      <span className="font-semibold text-gray-800">
                        Cash on Delivery
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Pay when you receive your order
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h4 className="font-semibold text-sm text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6 pt-4 border-t border-gray-300">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Charge</span>
                    <span className="font-semibold">
                      ৳{calculateShipping().toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-[#FC791A]">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processingPayment}
                  className="w-full px-6 py-3 bg-[#FC791A] text-white rounded-lg font-semibold hover:bg-[#e66a14] transition-colors transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingPayment
                    ? "Processing..."
                    : paymentMethod === "cod"
                    ? "Place Order (Cash on Delivery)"
                    : "Proceed to Payment"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

