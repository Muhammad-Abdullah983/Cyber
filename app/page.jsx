"use client";

import { useEffect, useState } from "react";
import HeroSection from "./component/Hero-section";
import ProductsSection from "./component/Apple-Products";
import BrowseByCategory from "./component/category";
import AllProducts from "./component/AllProducts";
import Discountcards from "./component/Discounts-cards";
import { Smartphone, Watch, Camera, Headphones, Monitor, Gamepad2, ShoppingBag } from "lucide-react";
import PopularProducts from "./component/Popular-Products";
import SummerSale from "./component/Summersale";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/products?limit=300&skip=0")
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!json.products || !Array.isArray(json.products)) {
          console.warn("No products found in API response");
          setData([]);
          return;
        }
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
      .catch((err) => {
        console.error("Error fetching products:", err.message);
        setData([]);
      });
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
    { icon: <ShoppingBag size={32} className="text-[#000000]" />, label: "Furniture" },
    { icon: <Monitor size={32} className="text-[#000000]" />, label: "Accessories" },
  ];

  const popularProducts = [
    {
      title: "Popular Products",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      desktopImage: "/images/Watch+airpods.svg",
      mobileImage: "/images/Watch+airpods.svg",
      bgColor: "bg-[#FFFFFF]",
    },
    {
      title: "Samsung Galaxy",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      desktopImage: "/images/samsung-galaxy.svg",
      mobileImage: "/images/samsung-galaxy.svg",
      bgColor: "bg-[#EAEAEA]",
    },
    {
      title: "Ipad Pro",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      desktopImage: "/images/ipadpro.svg",
      mobileImage: "/images/mobile/ipad.svg",
      bgColor: "bg-[#F9F9F9]",
    },
    {
      title: "MacBook Pro",
      desc: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      desktopImage: "/images/Mackbook-Pro.svg",
      mobileImage: "/images/Mackbook-Pro.svg",
      bgColor: "bg-[#2C2C2C]",
    },


  ];
  // Mobile-only reordered array: iPad Pro should appear first
  const mobilePopular = [
    popularProducts[2], // iPad Pro
    popularProducts[0], // Popular Products
    popularProducts[1], // Samsung Galaxy
    popularProducts[3], // MacBook Pro
  ];


  // Start carousel on the first item (MacBook) so iPad appears as the second item
  const [mobileIndex, setMobileIndex] = useState(0);

  return (
    <main className="bg-white text-black">
      <HeroSection />
      <ProductsSection />
      <BrowseByCategory title="Browse By Category" categories={categories} />

      <AllProducts data={firstEight} />

      {/* Popular Products Section */}
      <div className="flex flex-wrap">
        {/* Mobile: carousel that shows each popular product one at a time */}
        <div className="w-full block sm:hidden">
          {mobilePopular.length > 0 && (
            <>
              <PopularProducts
                title={mobilePopular[mobileIndex].title}
                desc={mobilePopular[mobileIndex].desc}
                desktopImage={mobilePopular[mobileIndex].desktopImage}
                mobileImage={mobilePopular[mobileIndex].mobileImage}
                bgColor={mobilePopular[mobileIndex].bgColor}
                mobileIndex={mobileIndex}
                setMobileIndex={setMobileIndex}
                dotsCount={mobilePopular.length}
              />
            </>
          )}
        </div>




        {/* Desktop: show all boxes */}
        {popularProducts.map((box, index) => (
          <div key={index} className="hidden sm:block w-1/2 lg:w-1/4">
            <PopularProducts
              title={box.title}
              desc={box.desc}
              desktopImage={box.desktopImage}
              mobileImage={box.mobileImage}
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
