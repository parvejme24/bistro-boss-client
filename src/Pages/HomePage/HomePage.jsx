import React from "react";
import Banner from "./comp/Banner/Banner";
import Category from "./comp/Category/Category";
import PopularFood from "./comp/PopularFood/PopularFood";
import PopularMenu from "./comp/PopularMenu/PopularMenu";
import Testimonial from "./comp/Testimonial/Testimonial";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <PopularFood />
      <Category />
      <PopularMenu />
      <Testimonial />
    </div>
  );
}
