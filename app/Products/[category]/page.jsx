"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiChevronLeft, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useWishlist } from "@/app/component/Wishlist/Wishlist";
import SidebarFilter from "@/app/component/Filter/Filter-sidebar";
import TextDropdownRow from "@/app/component/Filter/categoryTopbar";

export default function CategoryPage() {
  const { category } = useParams();
  const { wishlist, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [availableBrands, setAvailableBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(true);

  const SLIDER_MAX = 20000;
  const sliderPercent = Math.min(100, Math.max(0, Math.round((maxPrice / SLIDER_MAX) * 100)));

  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Default to 9 (Desktop), updates to 8 on mobile via useEffect
  const [productsPerPage, setProductsPerPage] = useState(9);

  // Handle Responsive Products Per Page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProductsPerPage(8); // Mobile: 8 items (4 rows of 2)
      } else {
        setProductsPerPage(9); // Desktop: 9 items (3 rows of 3)
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Body Scroll Lock when Mobile Filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFilterOpen]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setProducts([]);
      setAvailableBrands([]);
      setSelectedBrands([]);
      setCurrentPage(1);
      setSortBy("Newest");

      try {
        const res = await fetch("https://dummyjson.com/products?limit=200&skip=0");
        const data = await res.json();

        const categoryMap = {
          phones: "smartphones",
          computers: "laptops",
          smartwatches: "mens-watches",
          cameras: "fragrances",
          headphones: "mobile-accessories",
          gaming: "sports-accessories",
        };

        const apiCategory = categoryMap[category?.toLowerCase()] || category?.toLowerCase();
        const filtered = data.products.filter((p) =>
          p.category.toLowerCase().includes(apiCategory)
        );
        const unique = Array.from(new Map(filtered.map((p) => [p.id, p])).values());
        setProducts(unique);

        const brandCounts = unique.reduce((acc, product) => {
          const brand = product.brand || "Unknown";
          acc[brand] = (acc[brand] || 0) + 1;
          return acc;
        }, {});

        const brandsData = Object.keys(brandCounts)
          .map((brandName) => ({
            name: brandName,
            count: brandCounts[brandName],
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setAvailableBrands(brandsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (category) fetchProducts();
  }, [category]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedBrands.length > 0) {
      result = products.filter((product) =>
        selectedBrands.some(
          (selected) =>
            (product.brand || "Unknown").toLowerCase() === selected.toLowerCase()
        )
      );
    }
    // Apply price filter
    result = result.filter((product) => product.price >= minPrice && product.price <= maxPrice);

    switch (sortBy) {
      case "Price: Low to High":
        return [...result].sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return [...result].sort((a, b) => b.price - a.price);
      case "Newest":
      default:
        return result;
    }
  }, [products, selectedBrands, sortBy, minPrice, maxPrice]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleBrandToggle = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
    setCurrentPage(1);
    // If mobile filter overlay is open, close it after selecting a filter
    setIsMobileFilterOpen(false);
  };
  const handleSortChange = (newSortValue) => {
    setSortBy(newSortValue);
    setCurrentPage(1);
  };


  return (
    <div className="flex flex-col w-full mx-auto sm:w-[85%] sm:flex-row gap-6 p-4 sm:p-2 bg-white min-h-screen relative">

      {/* ===== MOBILE SIDEBAR OVERLAY ===== */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0  bg-opacity-50"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>

          {/* Sidebar Content */}
          <div
            className="relative w-full bg-white p-4 shadow-xl h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-start gap-4 text-black items-center mb-14">
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-2xl">
                <FiChevronLeft size={24} />
              </button>
              <h2 className="text-xl text-black font-bold">Filters</h2>
              <div className="w-6"></div>
            </div>

            {/* Price Filter */}
            <div className="mb-2 pb-1 text-black border-b border-gray-200">
              <button
                onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
                className="flex justify-between items-center w-full font-semibold text-gray-900 mb-3"
              >
                Price
                {isPriceFilterOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {isPriceFilterOpen && (
                <div className="space-y-3">
                  <div className="flex gap-3 ">
                    <div className="flex-1">
                      <label className="text-xs text-gray-600 block mb-1">From</label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        onKeyDown={(e) => e.key === "Enter" && setIsMobileFilterOpen(false)}
                        className="w-[70%] px-3 py-2 border border-gray-300 rounded text-sm"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label className="text-xs text-gray-600 text-right block pr-1 mb-1">To</label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        onKeyDown={(e) => e.key === "Enter" && setIsMobileFilterOpen(false)}
                        className="w-[70%] px-3 py-2 border border-gray-300 rounded text-sm ml-auto text-right"
                        placeholder="20000"
                      />
                    </div>

                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-2">Max Slider</label>
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-1"
                      style={{
                        WebkitAppearance: 'none',
                        background: `linear-gradient(to right, #000 ${sliderPercent}%, #E5E7EB ${sliderPercent}%)`
                      }}
                    />

                  </div>
                </div>
              )}
            </div>

            <SidebarFilter
              brands={availableBrands}
              selectedBrands={selectedBrands}
              onBrandToggle={handleBrandToggle}
            />
          </div>
        </div>
      )}

      {/* ===== DESKTOP LEFT SIDEBAR ===== */}
      <div className="hidden sm:block">
        <SidebarFilter
          brands={availableBrands}
          selectedBrands={selectedBrands}
          onBrandToggle={handleBrandToggle}
        />
      </div>

      {/* ===== RIGHT SECTION ===== */}
      <div className="flex flex-col flex-1">
        {/* --- Topbar --- */}
        <div className="mb-3 ">
          <TextDropdownRow
            subText="Products Result"
            count={filteredProducts.length}
            options={["Newest", "Price: Low to High", "Price: High to Low"]}
            selectedOption={sortBy}
            onOptionSelect={handleSortChange}
            onOpenFilter={() => setIsMobileFilterOpen(true)}
          />
        </div>

        {/* --- Product Grid --- */}
        <div className="flex flex-col">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3  gap-3 sm:gap-1  sm:gap-y-4">
                {currentProducts.map((item) => (
                  <div
                    key={item.id}
                    className="relative border rounded-[9px] bg-[#F6F6F6] sm:w-[267px] sm:h-[407px] py-6 sm:py-12 flex flex-col items-center hover:shadow-lg transition"
                  >
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="absolute top-3 right-3 sm:top-5 sm:right-5 text-lg sm:text-xl text-gray-600 hover:text-red-500 z-10"
                    >
                      {wishlist.includes(item.id) ? (
                        <FaHeart className="text-red-500 transition-colors" />
                      ) : (
                        <FiHeart className="transition-colors" />
                      )}
                    </button>

                    {/* --- 2. WRAPPED IMAGE IN LINK --- */}
                    <Link href={`/Details/${item.id}`} className="w-full flex justify-center">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-[90%] h-[120px] sm:h-[180px] object-contain rounded-lg mb-4 cursor-pointer"
                      />
                    </Link>

                    <h3
                      className="text-center text-base  sm:text-base font-medium text-black truncate w-full px-2 sm:pb-6 mb-3"
                      title={item.title}
                    >
                      {item.title}
                    </h3>
                    <p className="text-lg sm:text-2xl font-semibold text-black mb-3">
                      ${item.price}
                    </p>

                    {/* --- 3. WRAPPED BUTTON IN LINK --- */}
                    <Link href={`/Details/${item.id}`}>
                      <button className="px-10 py-3 sm:px-16 sm:py-4 bg-black text-white rounded-md text-sm sm:text-sm font-medium hover:bg-gray-800 transition">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center text-black items-center gap-3 pb-6 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${currentPage === i + 1
                        ? "bg-black text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded text-black hover:bg-gray-300 disabled:opacity-50"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 mt-10">
              {products.length > 0
                ? "No products match your current filters."
                : "No products found for this category."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}