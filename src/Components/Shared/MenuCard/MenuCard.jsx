import React from "react";
import { BsMinecartLoaded } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";

export default function MenuCard({ menu, displayMode }) {
  return (
    <div
      key={menu._id}
      className={`bg-white relative rounded-2xl p-5 duration-300 group overflow-hidden ${
        displayMode === 'list' ? 'flex items-center gap-5 p-3' : ''
      }`}
    >
      {/* Background image on hover (hidden in list mode) */}
      <div className={`absolute inset-0 bg-no-repeat bg-center bg-cover transition-opacity duration-500 ${
        displayMode === 'grid'
          ? 'opacity-0 group-hover:opacity-100 bg-[url(\'https://gramentheme.com/html/fresheat/assets/img/bg/dishesThumbBG.png\')]'
          : 'opacity-100 bg-[url(\'https://gramentheme.com/html/fresheat/assets/img/bg/dishesThumbBG.png\')]'
      }`}></div>

      {/* Foreground Content */}
      <img
        src={menu.image}
        alt={menu.title}
        className={`relative z-10 rounded-full ${
          displayMode === 'grid' ? 'w-[140px] h-[140px] mx-auto' : 'w-[80px] h-[80px]'
        }`}
      />
      <div className={`relative z-10 mt-5 space-y-1 ${
        displayMode === 'grid' ? 'text-center' : 'flex-1 mt-0 text-left'
      }`}>
        <h4 className="text-2xl font-bold group-hover:text-white">
          {menu.name}
        </h4>
        <p className="text-gray-500 group-hover:text-gray-300">
          {menu.recipe.slice(0, 25)}.....
        </p>
        <p className="text-red-600 font-bold text-xl">${menu.price}</p>
      </div>

      {/* Buttons with slide and fade animation */}
      <div className={`z-10 absolute top-0 right-0 grid gap-3 p-3 ${
        displayMode === 'list' ? 'relative top-auto right-auto flex flex-col items-end gap-2 p-0 opacity-100 translate-y-0' : ''
      }`}>
        <button className="bg-red-600 text-white p-2 rounded-full">
          <FaRegHeart />
        </button>
        <div className={`grid grid-cols-1 gap-3 ${
          displayMode === 'grid' ? 'opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500 ease-in-out' : 'opacity-100 translate-y-0'
        }`}>
          <button className="bg-white text-red hover:bg-red-600 hover:text-white duration-300 p-2 rounded-full">
            <BsMinecartLoaded />
          </button>
          <button className="bg-white text-red hover:bg-red-600 hover:text-white duration-300 p-2 rounded-full">
            <FiEye />
          </button>
        </div>
      </div>
    </div>
  );
}
