import React from "react";
import SectionHeader from "../../../../Components/Shared/SectionHeader/SectionHeader";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function PopularFood() {
  return (
    <div className="bg-[#F4F1EA] px-3 py-20">
      <div className="container mx-auto">
        <SectionHeader title={"Best Food"} subTitle={"Popular Food Items"} />

        {/* Popular Food Section */}
        <div className="pt-14">
          <Swiper
            spaceBetween={30}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
          >
            <SwiperSlide>
              <div className="bg-gradient-to-b from-transparent to-white p-5 rounded-2xl">
                <div className="relative mx-auto md:w-[150px] md:h-[150px]">
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/item1_1.png"
                    alt="Chicken Pizza"
                    className="p-2"
                  />
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/circleShape.png"
                    alt="Decorative Circle"
                    className="absolute top-0 left-0 animate-spin"
                  />
                </div>
                <div className="text-center mt-5 space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold">
                    Chicken Pizza
                  </h3>
                  <p className="text-gray-400 text-sm md:text-lg">
                    The Registration Free
                  </p>
                  <p className="font-bold text-red-600">$20.35</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gradient-to-b from-transparent to-white p-5 rounded-2xl">
                <div className="relative mx-auto md:w-[150px] md:h-[150px]">
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/item1_1.png"
                    alt="Chicken Pizza"
                    className="p-2"
                  />
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/circleShape.png"
                    alt="Decorative Circle"
                    className="absolute top-0 left-0 animate-spin"
                  />
                </div>
                <div className="text-center mt-5 space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold">
                    Chicken Pizza
                  </h3>
                  <p className="text-gray-400 text-sm md:text-lg">
                    The Registration Free
                  </p>
                  <p className="font-bold text-red-600">$20.35</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gradient-to-b from-transparent to-white p-5 rounded-2xl">
                <div className="relative mx-auto md:w-[150px] md:h-[150px]">
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/item1_1.png"
                    alt="Chicken Pizza"
                    className="p-2"
                  />
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/circleShape.png"
                    alt="Decorative Circle"
                    className="absolute top-0 left-0 animate-spin"
                  />
                </div>
                <div className="text-center mt-5 space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold">
                    Chicken Pizza
                  </h3>
                  <p className="text-gray-400 text-sm md:text-lg">
                    The Registration Free
                  </p>
                  <p className="font-bold text-red-600">$20.35</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gradient-to-b from-transparent to-white p-5 rounded-2xl">
                <div className="relative mx-auto md:w-[150px] md:h-[150px]">
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/item1_1.png"
                    alt="Chicken Pizza"
                    className="p-2"
                  />
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/circleShape.png"
                    alt="Decorative Circle"
                    className="absolute top-0 left-0 animate-spin"
                  />
                </div>
                <div className="text-center mt-5 space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold">
                    Chicken Pizza
                  </h3>
                  <p className="text-gray-400 text-sm md:text-lg">
                    The Registration Free
                  </p>
                  <p className="font-bold text-red-600">$20.35</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gradient-to-b from-transparent to-white p-5 rounded-2xl">
                <div className="relative mx-auto md:w-[150px] md:h-[150px]">
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/item1_1.png"
                    alt="Chicken Pizza"
                    className="p-2"
                  />
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/circleShape.png"
                    alt="Decorative Circle"
                    className="absolute top-0 left-0 animate-spin"
                  />
                </div>
                <div className="text-center mt-5 space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold">
                    Chicken Pizza
                  </h3>
                  <p className="text-gray-400 text-sm md:text-lg">
                    The Registration Free
                  </p>
                  <p className="font-bold text-red-600">$20.35</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gradient-to-b from-transparent to-white p-5 rounded-2xl">
                <div className="relative mx-auto md:w-[150px] md:h-[150px]">
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/item1_1.png"
                    alt="Chicken Pizza"
                    className="p-2"
                  />
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/circleShape.png"
                    alt="Decorative Circle"
                    className="absolute top-0 left-0 animate-spin"
                  />
                </div>
                <div className="text-center mt-5 space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold">
                    Chicken Pizza
                  </h3>
                  <p className="text-gray-400 text-sm md:text-lg">
                    The Registration Free
                  </p>
                  <p className="font-bold text-red-600">$20.35</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gradient-to-b from-transparent to-white p-5 rounded-2xl">
                <div className="relative mx-auto md:w-[150px] md:h-[150px]">
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/item1_1.png"
                    alt="Chicken Pizza"
                    className="p-2"
                  />
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/food-items/circleShape.png"
                    alt="Decorative Circle"
                    className="absolute top-0 left-0 animate-spin"
                  />
                </div>
                <div className="text-center mt-5 space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold">
                    Chicken Pizza
                  </h3>
                  <p className="text-gray-400 text-sm md:text-lg">
                    The Registration Free
                  </p>
                  <p className="font-bold text-red-600">$20.35</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
