import React from "react";
export default function Banner() {
  return (
    <div className="bannerBG  min-h-screen">
      <div className="bg-[#010f1cf3] w-full h-screen flex items-center justify-center">
        <div className="container mx-auto py-24 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center">
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 uppercase space-y-4 md:space-y-6 text-center md:text-left">
            <h4 className="text-orange-500 text-2xl md:text-3xl lg:text-4xl font-bold animate-bounce">
              Fresh & Delicious
            </h4>
            <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold animate-fade-in">
              Experience Culinary Excellence
            </h1>
            <p className="text-white text-lg md:text-xl lg:text-2xl mt-2 md:mt-4 animate-fade-in delay-200">
              Savor the rich flavors of our chef-crafted dishes, made with passion and the freshest ingredients.
            </p>
            <button className="mt-10 md:mt-16 bg-red-600 hover:bg-red-700 px-6 py-3 md:px-8 md:py-4 text-white text-lg md:text-xl rounded-full transform transition duration-300 ease-in-out hover:scale-110 animate-pulse">
              Explore Our Menu
            </button>
          </div>

          {/* Right Side: Image */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src="https://html.imjol.com/khadyo/khadyo/assets/images/menu-item/burger-promo.png"
              alt="Promo Burger"
              className="w-64 md:w-80 lg:w-96 h-auto animate-slide-in-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
