"use client";

import { useEffect, useState } from "react";
import HeroSection from "./component/Hero-section";
import ProductsSection from "./component/Apple-Products";
import BrowseByCategory from "./component/category";
import AllProducts from "./component/AllProducts";
import Discountcards from "./component/Discounts-cards";
import { Smartphone, Watch, Camera, Headphones, Monitor, Gamepad2 } from "lucide-react";
import PopularProducts from "./component/Popular-Products";
import SummerSale from "./component/Summersale";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=300&skip=0")
      .then((res) => res.json())
      .then((json) => {
        const techProducts = json.products.filter((item) =>
          [
            "laptops",
            "tablets",
            "cameras",
            "mobile accessories",
            "smartphones",
            "smartwatches",
            "audio",
            "computers",
            "gaming",
            "accessories",
          ].includes(item.category.toLowerCase())
        );
        setData(techProducts);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const firstEight = data.slice(0, 8);
  const nextFour = data.slice(8, 12);

  const categories = [
    { icon: <Smartphone size={32} className="text-[#000000]" />, label: "Phones" }, 
    { icon: <Watch size={32} className="text-[#000000]" />, label: "SmartWatches" },
    { icon: <Camera size={32} className="text-[#000000]" />, label: "Cameras" },
    { icon: <Headphones size={32} className="text-[#000000]" />, label: "Headphones" },
    { icon: <Monitor size={32} className="text-[#000000]" />, label: "Computers" },
    { icon: <Gamepad2 size={32} className="text-[#000000]" />, label: "Gaming" },
  ];

  const popularProducts = [
    {
      title: "Popular Products",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      image: "/images/Watch+airpods.svg",
      bgColor: "bg-[#FFFFFF]",
    },
    {
      title: "Ipad Pro",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      image: "/images/ipadpro.svg",
      bgColor: "bg-[#F9F9F9]",
    },
    {
      title: "Samsung Galaxy",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      image: "/images/samsung-galaxy.svg",
      bgColor: "bg-[#EAEAEA]",
    },
    {
      title: "MacBook Pro",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      image: "/images/Mackbook-Pro.svg",
      bgColor: "bg-[#2C2C2C]",
    },
  ];

  return (
    <main className="bg-white text-black">
      <HeroSection />
      <ProductsSection />
      <BrowseByCategory title="Browse By Category" categories={categories} />

      <AllProducts data={firstEight} />

      {/* Popular Products Section */}
      <div className="flex flex-wrap">
        {/* Mobile: only iPad box */}
        <div className="w-full block sm:hidden">
          <PopularProducts
            title="Ipad Pro"
            desc="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
            desktopImage="/images/ipadpro.svg"
            mobileImage="/images/mobile/ipad.svg"
            bgColor="bg-[#F9F9F9]"
          />
        </div>



        {/* Desktop: show all boxes */}
        {popularProducts.map((box, index) => (
          <div key={index} className="hidden sm:block w-1/2 lg:w-1/4">
            <PopularProducts
              title={box.title}
              desc={box.desc}
              desktopImage={box.image}  // updated to match component props
              mobileImage={box.image}   // optional, or same image for desktop mapping
              bgColor={box.bgColor}
            />
          </div>
        ))}
      </div>

      <Discountcards data={nextFour} />

      <SummerSale />
    </main>

  );
}
