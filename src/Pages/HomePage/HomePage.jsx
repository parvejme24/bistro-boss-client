import React from "react";
import Banner from "./comp/Banner/Banner";
import Category from "./comp/Category/Category";
import PopularFood from "./comp/PopularFood/PopularFood";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <PopularFood />
      <Category />
    </div>
  );
}
