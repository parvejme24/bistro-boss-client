import React from "react";

export default function Category() {
  return (
    <div className="bg-[#F4F1EA]">
      <div className="container mx-auto">
        <div className="flex items-center">
          <div>
            <h4>Start Price $25</h4>
            <h2>TODAY SPACIAL FOOD</h2>
            <h4>Limites Times Offer</h4>
            <button>Order Now</button>
          </div>
          <div>
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/offer/offerThumb1_2.png"
              alt=""
              className="w-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
