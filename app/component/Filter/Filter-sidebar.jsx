"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";

// --- NEW: Accept props from the parent component ---
// AFTER (This is the only change you need)
export default function SidebarFilter({
    brands = [],
    selectedBrands = [],
    onBrandToggle
}) {
    const [openSections, setOpenSections] = useState({
        brand: true,
        battery: false,
        screenType: false,
        screenSize: false,
        protection: false,
        memory: false,
    });

    const [brandSearch, setBrandSearch] = useState("");

    const [selectedFilters, setSelectedFilters] = useState({
        battery: [],
        screenType: [],
        screenSize: [],
        protection: [],
        memory: [],
    });

    // Hardcoded options for OTHER filters
    const filterOptions = {
        battery: [
            { name: "3000mAh", count: 50 },
            { name: "4000mAh", count: 70 },
            { name: "5000mAh", count: 30 },
        ],
        screenType: [
            { name: "LCD", count: 60 },
            { name: "OLED", count: 80 },
            { name: "AMOLED", count: 40 },
        ],
        // ... other filters ...
        memory: [
            { name: "64GB", count: 40 },
            { name: "128GB", count: 70 },
            { name: "256GB", count: 30 },
        ],
    };

    const toggleSection = (key) =>
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

    // --- UPDATED: This now calls the function from the parent ---
    const toggleBrand = (brand) => {
        onBrandToggle(brand);
    };

    // This toggle is still local (for battery, etc.)
    const toggleFilter = (section, option) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [section]: prev[section].includes(option)
                ? prev[section].filter((o) => o !== option)
                : [...prev[section], option],
        }));
    };

    // --- UPDATED: This uses the 'brands' prop ---
    const filteredBrands = brands.filter((b) =>
        b.name.toLowerCase().includes(brandSearch.toLowerCase())
    );

    // --- UPDATED: Changed wrapper from <div> to <aside> ---
    return (
        <aside className=" sm:block sm:w-full sm:max-w-[250px] sm:text-black sm:rounded-lg sm:p-4 sm:self-start">
            {/* BRAND SECTION (This JSX works as-is, since it reads from 'filteredBrands' and 'selectedBrands') */}
            <div className="mb-4">
                <button
                    onClick={() => toggleSection("brand")}
                    className="flex justify-between items-center w-full font-semibold text-gray-900"
                >
                    Brand
                    {openSections.brand ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                {openSections.brand && (
                    <div className="mt-3 space-y-2">
                        {/* Search Input */}
                        <div className="relative">
                            <FiSearch className="absolute left-2 top-2.5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                value={brandSearch}
                                onChange={(e) => setBrandSearch(e.target.value)}
                            />
                        </div>

                        {/* Brand Checkboxes */}
                        <div className="max-h-[200px] overflow-y-auto mt-2 pr-1">
                            {filteredBrands.map((b) => (
                                <label
                                    key={b.name}
                                    className="flex justify-between items-center text-sm py-1 cursor-pointer hover:bg-gray-100 rounded-md px-1"
                                >
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            // This correctly reads from the 'selectedBrands' prop
                                            checked={selectedBrands.includes(b.name)}
                                            // This now calls the updated toggleBrand function
                                            onChange={() => toggleBrand(b.name)}
                                            className="accent-black w-4 h-4"
                                        />
                                        <span className="text-gray-800">{b.name}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">{b.count}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* OTHER COLLAPSIBLE FILTERS (Still local state) */}
            {Object.keys(filterOptions).map((key) => (
                <div key={key} className="border-t border-gray-200 py-2">
                    <button
                        onClick={() => toggleSection(key)}
                        className="flex justify-between items-center w-full font-semibold text-gray-900"
                    >
                        {/* Capitalize first letter */}
                        {key.charAt(0).toUpperCase() + key.slice(1).replace('Type', ' Type').replace('Size', ' Size')}
                        {openSections[key] ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {openSections[key] && (
                        <div className="mt-2 max-h-[150px] overflow-y-auto pl-1">
                            {filterOptions[key].map((option) => (
                                <label
                                    key={option.name}
                                    className="flex justify-between items-center text-sm py-1 cursor-pointer hover:bg-gray-100 rounded-md px-1"
                                >
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters[key].includes(option.name)}
                                            onChange={() => toggleFilter(key, option.name)}
                                            className="accent-black w-4 h-4"
                                        />
                                        <span className="text-gray-800">{option.name}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">{option.count}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </aside>
    );
}