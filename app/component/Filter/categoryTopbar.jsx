"use client";
// import { FiSliders } from "react-icons/fi"; 

export default function TextDropdownRow({
  subText = "Products Result", // Default text
  count,                         // The number value
  options = [],
  selectedOption,
  onOptionSelect,
  onOpenFilter, 
}) {
  return (
    <div className="flex flex-wrap items-center justify-between w-full pt-3 md:flex-nowrap">
      
      {/* 1. MOBILE FILTER BUTTON */}
      <button
        onClick={onOpenFilter}
        className="order-1 flex w-[164px] items-center justify-between rounded-lg border border-[0.5px] border-[#D4D4D4] bg-white px-3 py-2.5 text-sm font-medium text-black sm:hidden"
      >
        <span>Filters</span>
        {/* Update your image path here */}
        <img 
          src="/images/mobile/filter-icon.svg" 
          alt="Filter" 
          className="h-5 w-4 object-contain" 
        />
      </button>

      {/* 2. TEXT LABEL + COUNT VALUE */}
      <div className="order-3 mt-4 w-full md:order-1 md:mt-0 md:w-auto">
        <span className="text-sm font-medium text-[#909090] md:text-base">
          {subText} :{" "}
          {/* This span controls the COLOR of the NUMBER */}
          <span className="text-black font-bold">
             {count}
          </span>
        </span>
      </div>

      {/* 3. SORT DROPDOWN */}
      <div className="order-2 w-[164px] sm:pr-5 md:w-auto">
        <select
          className="w-full rounded-lg border border-[#D4D4D4] border-[0.5px] bg-white  p-2.5 px-2 text-sm text-black outline-none md:w-[236px] md:p-1"
          value={selectedOption}
          onChange={(e) => onOptionSelect(e.target.value)}
        >
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}