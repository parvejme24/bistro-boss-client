import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

export default function Testimonial() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div className="bg-[#181818]">
      <div className="container mx-auto py-20">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews?.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="max-w-[600px] p-5 bg-white rounded-2xl">
                <div className="flex gap-5">
                  <img
                    src="https://gramentheme.com/html/fresheat/assets/img/testimonial/testimonialProfile1_1.png"
                    alt=""
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-2xl font-bold capitalize">
                      {review.name}
                    </h3>
                    <p>Full Stack Developer</p>
                    <p>{review.rating}</p>
                  </div>
                </div>
                <p className="mt-5 text-gray-500">{review.details}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
