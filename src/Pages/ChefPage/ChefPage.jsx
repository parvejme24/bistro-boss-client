import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import { FiSearch } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function ChefPage() {
  const [chefs, setChefs] = useState([]);
  const [menus, setMenus] = useState([]);
  const [chefsWithMenus, setChefsWithMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChefs, setFilteredChefs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  // Load chefs and menus data
  useEffect(() => {
    Promise.all([
      fetch("chef.json").then((res) => res.json()),
      fetch("menu.json").then((res) => res.json()),
    ])
      .then(([chefData, menuData]) => {
        setChefs(chefData);
        setMenus(menuData);

        // Map menus to chefs based on menuIds and count menu items
        const chefsWithMenuData = chefData.map((chef) => {
          const chefMenus = menuData.filter((menu) =>
            chef.menuIds?.includes(menu._id)
          );
          return {
            ...chef,
            totalMenuItems: chefMenus.length,
          };
        });

        setChefsWithMenus(chefsWithMenuData);
        setFilteredChefs(chefsWithMenuData);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  useEffect(() => {
    let currentFiltered = chefsWithMenus.filter(
      (chef) =>
        (chef.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (chef.designation || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredChefs(currentFiltered);
    setCurrentPage(1); // Reset to first page on search change
  }, [searchQuery, chefsWithMenus]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChefs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChefs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = [...Array(totalPages).keys()].map((number) => (
    <button
      key={number + 1}
      onClick={() => paginate(number + 1)}
      className={`px-4 py-2 mx-1 rounded-md ${
        currentPage === number + 1
          ? "bg-[#FC791A] text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {number + 1}
    </button>
  ));

  const handleViewMenu = (chefId) => {
    if (chefId) {
      navigate(`/chef-details/${chefId}`);
    } else {
      console.error("Chef ID is missing");
    }
  };

  return (
    <div className="bg-[#F4F1EA]">
      <DynamicTitle title={"Chefs"} />
      <PageHeader title={"Our Chefs"} />

      <div className="container mx-auto max-w-7xl px-5 pt-20 pb-8">
        {/* search option */}
        <div className="flex justify-center mb-5">
          <div className="relative flex items-center max-w-[500px] w-full">
            <input
              type="text"
              placeholder="Search Chefs..."
              className="border px-6 py-3 rounded-full shadow w-full pr-12 focus:outline-none focus:ring-2 focus:ring-[#FC791A]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className="absolute right-4 text-xl text-gray-500">
              <FiSearch />
            </span>
          </div>
        </div>

        {/* Chef List Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {currentItems.length > 0 ? (
            currentItems.map((chef) => (
              <div
                key={chef._id}
                className="bg-gradient-to-b from-transparent to-white pb-10"
              >
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="max-w-[250px] mx-auto"
                />
                <div className="pt-10 space-y-2 text-center">
                  <h3 className="text-2xl font-bold">{chef.name}</h3>
                  <p className="text-gray-600">{chef.designation || "Chef"}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={chef.rating || 0}
                      readOnly
                    />
                    <span className="text-gray-600 text-sm font-medium">
                      ({chef.rating || 0})
                    </span>
                  </div>

                  {/* Total Menu Items */}
                  <p className="text-gray-600 pt-2">
                    <span className="font-bold text-xl text-[#FC791A]">
                      {chef.totalMenuItems || 0}
                    </span>{" "}
                    Menu Items
                  </p>

                  {/* View Menu Button */}
                  <button
                    onClick={() => handleViewMenu(chef._id)}
                    className="mt-4 px-6 py-2 bg-[#FC791A] text-white rounded-lg font-semibold hover:bg-[#e66a14] transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-[#FC791A]/50 active:scale-95 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Menu
                    </span>
                    {/* Shine effect on hover */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No chefs found for your search.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredChefs.length > itemsPerPage && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 flex items-center gap-2"
            >
              <FaChevronLeft />
            </button>
            {renderPageNumbers}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 flex items-center gap-2"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
