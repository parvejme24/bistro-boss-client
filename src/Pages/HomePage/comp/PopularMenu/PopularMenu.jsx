import React, { useEffect, useState } from "react";
import SectionHeader from "../../../../Components/Shared/SectionHeader/SectionHeader";
import MenuCard from "../../../../Components/Shared/MenuCard/MenuCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function PopularMenu() {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => setMenus(data));
  }, []);

  return (
    <div className="bg-[#F4F1EA] px-3 py-20">
      <div className="container mx-auto max-w-7xl px-5">
        <SectionHeader
          title={"POPULAR DISHES"}
          subTitle={"Best selling Dishes"}
        />

        {/* our popular dishes  */}
        <div className="mt-14">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            className="mySwiper"
          >
            {menus?.map((menu) => (
              <SwiperSlide key={menu._id}>
                <MenuCard menu={menu} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
