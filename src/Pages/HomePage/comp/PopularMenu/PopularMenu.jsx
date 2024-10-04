import React, { useEffect, useState } from "react";
import SectionHeader from "../../../../Components/Shared/SectionHeader/SectionHeader";
import MenuCard from "../../../../Components/Shared/MenuCard/MenuCard";

export default function PopularMenu() {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => setMenus(data));
  }, []);

  return (
    <div className="bg-[#F4F1EA] px-3 py-20">
      <div className="container mx-auto">
        <SectionHeader
          title={"POPULAR DISHES"}
          subTitle={"Best selling Dishes"}
        />

        {/* our popular dishes  */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {menus?.map((menu) => (
            <MenuCard menu={menu} />
          ))}
        </div>
      </div>
    </div>
  );
}
