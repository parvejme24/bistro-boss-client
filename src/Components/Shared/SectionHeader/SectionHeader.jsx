import React from "react";

export default function SectionHeader({ subTitle, title }) {
  return (
    <div className="">
      <div className="flex items-center gap-2 justify-center">
        <div>
          <img
            src="https://gramentheme.com/html/fresheat/assets/img/icon/titleIcon.svg"
            alt=""
          />
        </div>
        <h4 className="uppercase text-[#FC791A] font-bold">{title}</h4>
        <div>
          <img
            src="https://gramentheme.com/html/fresheat/assets/img/icon/titleIcon.svg"
            alt=""
          />
        </div>
      </div>
      <p className="text-3xl lg:text-5xl font-bold text-center mt-3">
        {subTitle}
      </p>
    </div>
  );
}
