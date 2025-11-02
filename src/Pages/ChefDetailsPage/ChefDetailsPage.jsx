import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import MenuCard from "../../Components/Shared/MenuCard/MenuCard";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaArrowLeft } from "react-icons/fa";

export default function ChefDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);
  const [chefMenus, setChefMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load chefs and menus data
    Promise.all([
      fetch("chef.json").then((res) => res.json()),
      fetch("menu.json").then((res) => res.json()),
    ])
      .then(([chefData, menuData]) => {
        // Find the chef by ID (try both _id and id)
        const foundChef = chefData.find(
          (c) => c._id === id || c.id === id
        );
        
        if (foundChef) {
          setChef(foundChef);
          
          // Find all menus that match the chef's menuIds
          const menus = menuData.filter((menu) =>
            foundChef.menuIds?.includes(menu._id)
          );
          setChefMenus(menus);
        } else {
          console.log("Chef not found. ID:", id);
          console.log("Available chef IDs:", chefData.map((c) => c._id || c.id));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#F4F1EA] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FC791A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chef details...</p>
        </div>
      </div>
    );
  }

  if (!chef) {
    return (
      <div className="bg-[#F4F1EA] min-h-screen">
        <PageHeader title={"Chef Not Found"} />
        <div className="container mx-auto max-w-7xl px-5 pt-20 pb-16">
          <div className="text-center">
            <p className="text-gray-600 text-xl mb-6">Chef not found.</p>
            <button
              onClick={() => navigate("/chef")}
              className="px-6 py-3 bg-[#FC791A] text-white rounded-lg hover:bg-[#e66a14] transition-colors"
            >
              Back to Chefs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F1EA]">
      <DynamicTitle title={`${chef.name} - Chef Details`} />
      <PageHeader title={chef.name} />

      <div className="container mx-auto max-w-7xl px-5 pt-20 pb-16">
        {/* Back Button */}
        <button
          onClick={() => navigate("/chef")}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-[#FC791A] transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Chefs</span>
        </button>

        {/* Chef Information Section */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Chef Image */}
            <div className="flex-shrink-0">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-[#FC791A]"
              />
            </div>

            {/* Chef Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                {chef.name}
              </h1>
              <p className="text-2xl text-[#FC791A] font-semibold mb-4">
                {chef.designation || "Chef"}
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={chef.rating || 0}
                  readOnly
                />
                <span className="text-gray-600 text-lg font-medium">
                  {chef.rating || 0} / 5.0
                </span>
              </div>

              {/* Menu Items Count */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  <span className="font-bold text-3xl text-[#FC791A]">
                    {chefMenus.length}
                  </span>{" "}
                  <span className="text-xl">Menu Items Available</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chef's Menu Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            {chef.name}'s Specialties
          </h2>

          {chefMenus.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {chefMenus.map((menu) => (
                <MenuCard key={menu._id} menu={menu} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-xl">
                No menus available for this chef.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
