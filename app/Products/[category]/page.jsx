"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link"; // <--- 1. IMPORT ADDED HERE
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import SidebarFilter from "@/app/component/Filter/Filter-sidebar";
import TextDropdownRow from "@/app/component/Filter/categoryTopbar";

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const [availableBrands, setAvailableBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
    switch (sortBy) {
      case "Price: Low to High":
        return [...result].sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return [...result].sort((a, b) => b.price - a.price);
      case "Newest":
      default:
        return result;
    }
  }, [products, selectedBrands, sortBy]);

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
             className="relative w-[80%] bg-white p-6 shadow-xl h-full overflow-y-auto"
             onClick={(e) => e.stopPropagation()} 
           >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <IoClose size={24} />
                </button>
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
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
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