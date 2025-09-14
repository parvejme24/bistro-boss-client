import React, { useEffect, useState } from "react";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import MenuCard from "../../Components/Shared/MenuCard/MenuCard";
import { FiSearch } from "react-icons/fi";
import { BsGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filterOption, setFilterOption] = useState('all'); // Default to 'all'
  const [displayMode, setDisplayMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        setMenus(data);
        setFilteredMenus(data);
      });
  }, []);

  useEffect(() => {
    let currentFiltered = menus.filter(menu =>
      menu.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterOption === 'new') {
      currentFiltered = currentFiltered.filter(menu => menu.isNew);
    } else if (filterOption === 'best-selling') {
      currentFiltered = currentFiltered.filter(menu => menu.isBestSelling);
    } else if (filterOption === 'todays-offer') {
      currentFiltered = currentFiltered.filter(menu => menu.isTodaysOffer);
    } else if (filterOption === 'high-price') {
      currentFiltered.sort((a, b) => b.price - a.price);
    } else if (filterOption === 'low-price') {
      currentFiltered.sort((a, b) => a.price - b.price);
    }

    setFilteredMenus(currentFiltered);
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [searchQuery, menus, filterOption]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenus.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMenus.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = [...Array(totalPages).keys()].map(number => (
    <button
      key={number + 1}
      onClick={() => paginate(number + 1)}
      className={`px-4 py-2 mx-1 rounded-md ${currentPage === number + 1 ? 'bg-[#FC791A] text-white' : 'bg-gray-200 text-gray-700'}`}
    >
      {number + 1}
    </button>
  ));

  return (
    <div className="bg-[#F4F1EA]">
      <DynamicTitle title={"Menu"} />
      <PageHeader title={"Menu Page"} />

      <div className="container mx-auto max-w-7xl px-5 pt-20 pb-8">
        <div className="bg-white px-4 py-4 rounded-lg mb-5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* search option  */}
          <div className="relative flex items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search Menu..."
              className="border px-6 py-3 rounded-full shadow w-full md:w-[300px] pr-12 focus:outline-none focus:ring-2 focus:ring-[#FC791A]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className="absolute right-4 text-xl text-gray-500">
              <FiSearch />
            </span>
          </div>

          {/* short filter  */}
          <div>
            <select name="short" className="border px-6 py-3 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-[#FC791A]"
              value={filterOption} onChange={handleFilterChange}>
              <option value="all">Short or Filter</option>
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="best-selling">Best Selling</option>
              <option value="todays-offer">Today's Offer</option>
              <option value="high-price">High Price</option>
              <option value="low-price">Low Price</option>
            </select>
          </div>

          {/* Layout Toggle */}
          <div className="flex gap-2">
            <button
              className={`p-3 rounded-full ${displayMode === 'grid' ? 'bg-[#FC791A] text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setDisplayMode('grid')}
              aria-label="Grid View"
            >
              <BsGridFill className="text-xl" />
            </button>
            <button
              className={`p-3 rounded-full ${displayMode === 'list' ? 'bg-[#FC791A] text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setDisplayMode('list')}
              aria-label="List View"
            >
              <FaListUl className="text-xl" />
            </button>
          </div>
        </div>

        <div className={displayMode === 'grid' ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"}>
          {currentItems.length > 0 ? (
            currentItems?.map((menu) => (
              <MenuCard key={menu._id} menu={menu} displayMode={displayMode} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No menu items found for your search.</p>
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
