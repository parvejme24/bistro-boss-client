import React from "react";

export default function PageHeader({ title }) {
  return (
    <div className="bg-[url('https://gramentheme.com/html/fresheat/assets/img/bg/breadcumb.jpg')] bg-no-repeat max-h-[250px] h-[250px] w-[100%] bg-center bg-cover flex justify-center items-center">
      <h2 className="text-white text-3xl md:text-5xl font-bold uppercase">
        {title}
      </h2>
    </div>
  );
}
