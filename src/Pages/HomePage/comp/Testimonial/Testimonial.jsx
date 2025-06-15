import React, { useEffect, useState } from "react";
import SectionHeader from "../../../../Components/Shared/SectionHeader/SectionHeader";

import Slider from "react-slick";

// Import Swiper styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function Testimonial() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="py-20">
      <SectionHeader title={"Testimonial"} subTitle={"Client Feedback"} />

      <div className="container mx-auto pt-14">
        <Slider {...settings} className="">
          {reviews?.map((review) => (
            <div key={review._id} className="px-2">
              <div className="p-5 rounded-xl shadow-md border h-[250px]">
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
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
