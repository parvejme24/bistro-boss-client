import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

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

  // Quantity handlers
  const handleIncrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item handler
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  if (loading) {
    return (
      <div className="bg-[#F4F1EA] min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F1EA] min-h-screen">
      <DynamicTitle title={"Cart"} />
      <PageHeader title={"Shopping Cart"} />

      <div className="container mx-auto max-w-7xl px-5 pt-20 pb-20">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Your cart is empty
            </h2>
            <Link
              to="/menu"
              className="inline-block mt-4 px-6 py-3 bg-[#FC791A] text-white rounded-lg font-semibold hover:bg-[#e66a14] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Product List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Cart Items ({cartItems.length})
              </h2>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4 items-center hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="w-full md:w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-[#FC791A] font-bold text-lg">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2">
                        <button
                          onClick={() => handleDecrement(item._id)}
                          className="text-gray-600 hover:text-[#FC791A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={14} />
                        </button>
                        <span className="text-lg font-semibold text-gray-800 min-w-[30px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item._id)}
                          className="text-gray-600 hover:text-[#FC791A] transition-colors"
                        >
                          <FaPlus size={14} />
                        </button>
                      </div>

                      {/* Total Price for this item */}
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-xl font-bold text-[#FC791A]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Price Calculation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
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

                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-[#FC791A]">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full px-6 py-3 bg-[#FC791A] text-white rounded-lg font-semibold hover:bg-[#e66a14] transition-colors transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                  <Link
                    to="/menu"
                    className="block w-full text-center px-6 py-3 border-2 border-[#FC791A] text-[#FC791A] rounded-lg font-semibold hover:bg-[#FC791A] hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    <span className="font-semibold">Free shipping</span> on
                    orders over $50
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

