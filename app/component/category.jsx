"use client";

import React from "react";
import Link from "next/link";

export default function BrowseByCategory({ title, categories }) {
    return (
        <section className="w-full bg-[#FAFAFA] py-10 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl sm:text-2xl font-medium text-[#000000] mb-6">
                        {title}
                    </h2>
                    <div className="flex items-center gap-4 mb-6 mr-4">
                        <img src="/images/leftarrow.svg" alt="" className="h-6" />
                        <img src="/images/rightarrow.svg" alt="" className="ml-4 h-6" />
                    </div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                    {categories.map((cat, index) => (
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
