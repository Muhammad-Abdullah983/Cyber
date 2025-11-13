"use client";

import Breadcrumb from "@/app/component/Breadcrum";
import TextDropdownRow from "@/app/component/Filter/categoryTopbar";
import React from "react";

export default function Layout({ children }) {
  const sortOptions = [
    { label: "By Rating", value: "By Rating" },
    { label: "Price: Low to High", value: "priceLow" },
    { label: "Price: High to Low", value: "priceHigh" },
  ];

  

  return (
    <div className="min-h-screen  bg-white">
      {/* Breadcrumb */}
      <Breadcrumb />


      <div>{children}</div>


    </div>
  );
}
