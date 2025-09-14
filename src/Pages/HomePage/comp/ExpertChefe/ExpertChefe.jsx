import React from "react";
import SectionHeader from "../../../../Components/Shared/SectionHeader/SectionHeader";

export default function ExpertChefe() {
  const chefes = [
    {
      id: 1,
      name: "Ralph Edwards",
      role: "Chef Lead",
      image:
        "https://gramentheme.com/html/fresheat/assets/img/chefe/chefeThumb1_1.png",
    },
    {
      id: 1,
      name: "Ralph Edwards",
      role: "Chef Lead",
      image:
        "https://gramentheme.com/html/fresheat/assets/img/chefe/chefeThumb1_1.png",
    },
    {
      id: 1,
      name: "Ralph Edwards",
      role: "Chef Lead",
      image:
        "https://gramentheme.com/html/fresheat/assets/img/chefe/chefeThumb1_1.png",
    },
    {
      id: 1,
      name: "Ralph Edwards",
      role: "Chef Lead",
      image:
        "https://gramentheme.com/html/fresheat/assets/img/chefe/chefeThumb1_1.png",
    },
  ];
  return (
    <div className="bg-[#F4F1EA] px-3 py-20">
      <SectionHeader title={"Our Chefe"} subTitle={"Meet Our Expert Chefe"} />

      <div className="pt-14 container mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {chefes.map((chefe) => (
          <div
            key={chefe.id}
            className="bg-gradient-to-b from-transparent to-white pb-10"
          >
            <img
              src={chefe.image}
              alt={chefe.name}
              className="max-w-[250px] mx-auto"
            />
            <div className="pt-10 space-y-2 text-center">
              <h3 className="text-2xl font-bold">{chefe.name}</h3>
              <p className="text-gray-600">{chefe.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
