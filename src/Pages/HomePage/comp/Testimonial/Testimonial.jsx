import React, { useEffect, useState } from "react";
import SectionHeader from "../../../../Components/Shared/SectionHeader/SectionHeader";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function Testimonial() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="py-20">
      <SectionHeader title={"Testimonial"} subTitle={"Client Feedback"} />

      <div className="container mx-auto pt-14">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews?.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="p-5 rounded-xl shadow-md border min-h-[250px]">
                {/* Upper part: Profile and Info */}
                <div className="flex gap-5">
                  <img
                    src={
                      "https://gramentheme.com/html/fresheat/assets/img/testimonial/testimonialProfile1_1.png"
                    }
                    alt={review.name}
                    className="w-[70px] h-[70px] rounded-full"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">{review.name}</h3>
                    <p className="text-gray-600">{"Web Designer"}</p>
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={review.rating}
                      readOnly
                    />
                  </div>
                </div>

                {/* Review Details */}
                <p className="mt-5">{review.details}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
