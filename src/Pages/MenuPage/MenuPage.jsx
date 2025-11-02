import React, { useEffect, useState } from "react";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import MenuCard from "../../Components/Shared/MenuCard/MenuCard";
import { FiSearch } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        setMenus(data);
        setFilteredMenus(data);
      });
  }, []);

  useEffect(() => {
    let currentFiltered = menus.filter((menu) =>
      menu.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredMenus(currentFiltered);
    setCurrentPage(1); // Reset to first page on search change
  }, [searchQuery, menus]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenus.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMenus.length / itemsPerPage);

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

  return (
    <div className="bg-[#F4F1EA]">
      <DynamicTitle title={"Menu"} />
      <PageHeader title={"Menu Page"} />

      <div className="container mx-auto max-w-7xl px-5 pt-20 pb-8">
        {/* search option  */}
        <div className="flex justify-center mb-5">
          <div className="relative flex items-center max-w-[500px] w-full">
            <input
              type="text"
              placeholder="Search Menu..."
              className="border px-6 py-3 rounded-full shadow w-full pr-12 focus:outline-none focus:ring-2 focus:ring-[#FC791A]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className="absolute right-4 text-xl text-gray-500">
              <FiSearch />
            </span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {currentItems.length > 0 ? (
            currentItems?.map((menu) => <MenuCard key={menu._id} menu={menu} />)
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No menu items found for your search.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredMenus.length > itemsPerPage && (
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
