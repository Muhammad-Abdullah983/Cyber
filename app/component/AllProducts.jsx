"use client";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "./Wishlist/Wishlist";

export default function AllProducts({ data = [] }) {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <section className="bg-white items-left  py-8">
      {/* 🔖 Tabs */}
      <div className="flex flex-wrap justify-start items-center gap-6 pl-27 pb-6">
        <h1 className="text-base sm:text-[18px] font-medium text-black border-b-2 border-black cursor-pointer hover:text-gray-600 transition">
          New Arrival
        </h1>
        <h1 className="text-base sm:text-[18px] font-medium text-[#8B8B8B] cursor-pointer hover:text-gray-600 transition">
          Best Seller
        </h1>
        <h1 className="text-base sm:text-[18px] font-medium text-[#8B8B8B] cursor-pointer hover:text-gray-600 transition">
          Featured Products
        </h1>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center sm:gap-6 gap-4 p-4">
        {data.map((item) => {
          const isWishlisted = wishlist.includes(item.id);

          const imageSrc =
            item.image ??
            item.thumbnail ??
            (item.images && item.images[0]) ??
            null;

          return (
            <Link key={item.id} href={`/Details/${item.id}`}>
              <div
                className="relative w-[163px] h-[350px] sm:w-[268px] sm:h-[406px] bg-[#F6F6F6] shadow-md rounded-[9px] flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 cursor-pointer"
              >
                {/* ❤️ Wishlist Icon */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(item.id);
                  }}
                  className="absolute top-3 right-3 z-10 rounded-full p-2 hover:bg-gray-100 transition"
                  aria-label="Add to wishlist"
                >
                  {isWishlisted ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FiHeart className="text-gray-600 text-xl" />
                  )}
                </button>

                {/* Product Image */}
                <div className="relative w-full h-[60%]">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={item.title}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                      No image
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4 flex-1 flex flex-col text-black justify-between">
                  <div className="text-center">
                    <h2 className="text-base text-[#000000] font-medium line-clamp-2 mb-2">
                      {item.title}
                    </h2>
                    <p className="text-2xl font-semibold text-[#000000]">
                      ${item.price}
                    </p>
                  </div>

                  <button className="mt-4 px-6 py-3 w-[139px] sm:w-[183px] sm:h-12 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition block mx-auto">
                    Buy Now
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
