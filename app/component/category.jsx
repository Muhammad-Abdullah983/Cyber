"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BrowseByCategory({ title, categories }) {
    const [carouselOffset, setCarouselOffset] = useState(0);

    // On large screens show 6 items; on smaller screens grid classes handle layout.
    const itemsPerView = 6;
    const maxOffset = Math.max(0, categories.length - itemsPerView);

    const handlePrev = () => {
        setCarouselOffset((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCarouselOffset((prev) => Math.min(maxOffset, prev + 1));
    };

    const visibleCategories = categories.slice(carouselOffset, carouselOffset + itemsPerView);

    return (
        <section className="w-full bg-[#FAFAFA] py-10 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-medium text-[#000000] mb-6">
                        {title}
                    </h2>
                    <div className="flex items-center gap-4 mb-6 mr-4">
                        <button
                            onClick={handlePrev}
                            disabled={carouselOffset === 0}
                            className="hover:opacity-70 transition disabled:opacity-30"
                            aria-label="Previous categories"
                        >
                            <img src="/images/leftarrow.svg" alt="Previous" className="sm:h-6 h-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={carouselOffset >= maxOffset}
                            className="hover:opacity-70 transition disabled:opacity-30"
                            aria-label="Next categories"
                        >
                            <img src="/images/rightarrow.svg" alt="Next" className="ml-4 sm:h-6 h-5" />
                        </button>
                    </div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                    {visibleCategories.map((cat, index) => (
                        <Link
                            key={cat.label ?? index}
                            href={`/Products/${encodeURIComponent(cat.label.toLowerCase())}`}
                            className="flex flex-col items-center w-[163px] h-[128px] sm:w-[160px] sm:h-[128px] justify-center bg-[#EDEDED] rounded-[15px] hover:bg-gray-400 transition cursor-pointer"
                        >
                            {cat.icon}
                            <span className="text-sm sm:text-base font-medium text-black mt-3">
                                {cat.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
