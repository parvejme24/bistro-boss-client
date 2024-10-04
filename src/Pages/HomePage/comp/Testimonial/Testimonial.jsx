import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

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
    <div className="bg-[#181818]">
      <div className="container mx-auto py-32">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews?.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="p-10 bg-white rounded-2xl">
                <div className="flex items-center gap-5">
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
                    <p className="">
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={review.rating}
                        readOnly
                      />
                    </p>
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
