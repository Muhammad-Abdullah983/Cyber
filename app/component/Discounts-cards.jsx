"use client";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";

export default function Discountcards({ data = [] }) {
    const [wishlist, setWishlist] = useState([]);

    // Debug: log incoming data to inspect image fields
    if (process.env.NODE_ENV !== "production") {
        // non-blocking log
        console.info("Discountcards data sample:", data.slice(0, 3));
    }

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Truncate a title to `n` words and append ellipsis
    const truncateWords = (str, n = 15) => {
        if (!str) return "";
        const words = String(str).trim().split(/\s+/);
        return words.length > n ? words.slice(0, n).join(" ") + "..." : str;
    };

    return (
        <section className="bg-white py-15 ">
            <h1 className="text-2xl font-medium text-black text-left sm:pl-28 ml-4 mb-6">Discounts up to -50%</h1>
           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 gap-4 p-4 justify-items-center sm:mx-26">

                {data.map((item) => {
                    const isWishlisted = wishlist.includes(item.id);

                    return (
                        <div
                            key={item.id}
                            className="relative w-[163px] h-[352px] sm:w-[268px] sm:h-[406px] bg-[#F6F6F6] shadow-md rounded-[9px] flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-transform duration-300"
                        >
                            <button
                                onClick={() => toggleWishlist(item.id)}
                                className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                            >
                                {isWishlisted ? (
                                    <FaHeart className="text-red-500 text-lg" />
                                ) : (
                                    <FiHeart className="text-gray-600 text-lg" />
                                )}
                            </button>

                            <div className="relative w-full h-[60%]">
                                {
                                    // Normalize image field and guard against empty strings
                                }
                                {(() => {
                                    const rawImage = item.image ?? item.thumbnail ?? (item.images && item.images[0]) ?? null;
                                    const imageSrc = rawImage && typeof rawImage === "string" && rawImage.trim() !== "" ? rawImage : null;

                                    if (!imageSrc) {
                                        return (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                                                No image
                                            </div>
                                        );
                                    }

                                    // Use next/image for local images, plain <img> for remote API images (debug-friendly)
                                    if (imageSrc.startsWith("/")) {
                                        return (
                                            <Image src={imageSrc} alt={item.title} fill className="object-contain p-4" />
                                        );
                                    }

                                    return <img src={imageSrc} alt={item.title} className="object-contain p-4 w-full h-full" />;
                                })()}
                            </div>

                            <div className="p-4 flex-1 flex flex-col text-black justify-between">
                                <div className="text-center">
                                    <h2 className="text-base text-[#000000] font-medium line-clamp-2 mb-2">
                                        {truncateWords(item.title, 15)}
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
                    );
                })}
            </div>
        </section>
    );
}
