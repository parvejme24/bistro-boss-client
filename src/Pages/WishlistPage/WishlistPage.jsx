import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist and cart data
  useEffect(() => {
    Promise.all([
      fetch("wishlist.json").then((res) => res.json()),
      fetch("cart.json").then((res) => res.json()),
    ])
      .then(([wishlistData, cartData]) => {
        setWishlistItems(wishlistData);
        setCartItems(cartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, []);

  // Remove item from wishlist
  const handleRemoveFromWishlist = (id) => {
    Swal.fire({
      title: "Remove from Wishlist?",
      text: "Are you sure you want to remove this item from your wishlist?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FC791A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedWishlist = wishlistItems.filter((item) => item._id !== id);
        setWishlistItems(updatedWishlist);
        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Item has been removed from your wishlist.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Add to cart and remove from wishlist
  const handleAddToCart = (wishlistItem) => {
    // Check if item already exists in cart
    const existingCartItem = cartItems.find(
      (item) => item._id === wishlistItem._id
    );

    if (existingCartItem) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: "This item is already in your cart.",
        timer: 2000,
        showConfirmButton: false,
      });
      // Still remove from wishlist if it's already in cart
      const updatedWishlist = wishlistItems.filter(
        (item) => item._id !== wishlistItem._id
      );
      setWishlistItems(updatedWishlist);
    } else {
      // Add to cart with quantity 1
      const cartItem = {
        ...wishlistItem,
        quantity: 1,
      };
      const updatedCart = [...cartItems, cartItem];
      setCartItems(updatedCart);

      // Remove from wishlist
      const updatedWishlist = wishlistItems.filter(
        (item) => item._id !== wishlistItem._id
      );
      setWishlistItems(updatedWishlist);

      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${wishlistItem.name} has been added to your cart.`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Optional: Navigate to cart
      setTimeout(() => {
        navigate("/cart");
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F4F1EA] min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F1EA] min-h-screen">
      <DynamicTitle title={"Wishlist"} />
      <PageHeader title={"My Wishlist"} />

      <div className="container mx-auto max-w-7xl px-5 pt-20 pb-20">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding items you love to your wishlist!
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="inline-block px-6 py-3 bg-[#FC791A] text-white rounded-lg font-semibold hover:bg-[#e66a14] transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Wishlist Items ({wishlistItems.length})
              </h2>
            </div>

            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-center gap-4 p-4"
                >
                  {/* Product Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info - Middle Section */}
                  <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                    <div className="flex-1 min-w-0">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-[#FC791A] bg-orange-50 rounded">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-xl font-bold text-[#FC791A]">
                        ৳{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons - Right Section */}
                  <div className="flex flex-row md:flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 bg-[#FC791A] text-white rounded-lg font-semibold hover:bg-[#e66a14] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                      title="Remove from wishlist"
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


