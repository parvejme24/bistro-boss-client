import React, { useEffect, useState } from "react";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import DynamicTitle from "../../Components/Shared/DynamicTitle/DynamicTitle";
import MenuCard from "../../Components/Shared/MenuCard/MenuCard";
import { FiSearch } from "react-icons/fi";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => setMenus(data));
  }, []);

  return (
    <div className="bg-[#F4F1EA]">
      <DynamicTitle title={"Menu"} />
      <PageHeader title={"Menu Page"} />

      <div className="container mx-auto pt-20 pb-8">
        <div className="bg-white px-4 py-4 rounded-lg mb-5 flex justify-between items-center">
          {/* search option  */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search Menu"
              className="border px-6 py-3 rounded-full shadow max-w-[300px] w-[300px] "
            />
            <span className="-ml-10 text-xl">
              <FiSearch />
            </span>
          </div>

          {/* short filter  */}
          <div>
            <select name="short">
                <option value="">Short or Filter</option>
                <option value="">All</option>
                <option value="">New</option>
                <option value="">Best Selling</option>
                <option value="">Todays Offer</option>
                <option value="">High Price</option>
                <option value="">Low Price</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {menus?.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>
      </div>
    </div>
  );
}
