import React from "react";
import SectionHeader from "../../../../Components/Shared/SectionHeader/SectionHeader";

import Slider from "react-slick";

// Import Swiper styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Avatar from "../../../../Components/Shared/Avatar/Avatar";
import { FaUserCircle } from "react-icons/fa";

// Static reviews data used for testimonials
const reviewsData = [
  {
    name: "Ava Thompson",
    designation: "Product Manager",
    rating: 5,
    reviewText:
      "This is by far the best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!",
  },
  {
    name: "Liam Carter",
    designation: "UX Designer",
    rating: 5,
    reviewText:
      "This is by far the best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!",
  },
  {
    name: "Mia Rodriguez",
    designation: "Software Engineer",
    rating: 5,
    reviewText:
      "This is by far the best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!",
  },
  {
    name: "Ethan Patel",
    designation: "Marketing Lead",
    rating: 5,
    reviewText:
      "This is by far the best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!",
  },
  {
    name: "Sophia Nguyen",
    designation: "Data Analyst",
    rating: 5,
    reviewText:
      "This is by far the best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!",
  },
  {
    name: "Noah Williams",
    designation: "Operations Manager",
    rating: 5,
    reviewText:
      "This is by far the best service I have ever used. The customer support is outstanding, and the product itself is top-notch. I couldn't be happier!",
  },
];

export default function Testimonial() {
  // Load review data from local array
  const reviews = reviewsData;

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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // settings for slider

  return (
    <div className="py-20">
      <SectionHeader title={"Testimonial"} subTitle={"Client Feedback"} />

      <div className="container mx-auto max-w-7xl px-5 pt-14">
        <Slider {...settings} className="">
          {reviews?.map((review, index) => {
            return (
              <div key={index} className="px-2">
                <div className="p-5 rounded-xl shadow-md border h-[320px] overflow-hidden flex flex-col">
                  {/* Upper part: Profile and Info */}
                  <div className="flex gap-5">
                    {review.image ? (
                      <Avatar
                        user={{ name: review.name, image: review.image }}
                        size="xl"
                        showBorder={false}
                        className="w-[70px] h-[70px]"
                      />
                    ) : (
                      <FaUserCircle className="text-gray-300" size={70} />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold">{review.name}</h3>
                      <p className="text-gray-600">{review.designation}</p>
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={review.rating}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Review Details */}
                  <p
                    className="mt-5 text-gray-700 flex-1"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {review.reviewText || review.details}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
