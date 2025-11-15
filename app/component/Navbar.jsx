"use client";

import { FiHeart, FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartDetails/cart";



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 2. GET CART DATA
  const { cart } = useCart();

  // 3. CALCULATE TOTAL ITEMS
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="w-[100%] bg-white text-black border-b border-b-[#B5B5B5] gap-10 py-4 relative z-50">
      <div className="container mx-auto w-[90%] sm:w-[80%] max-w-7xl flex items-center justify-between md:gap-11">

        {/* --- LOGO --- */}
        <div className="flex items-center  shrink-0">
          <Image
            src="/images/Cyber.svg"
            alt="Cyber Logo"
            width={66}
            height={50}
            className="object-contain w-[100px] sm:w-[75px] md:w-[75px] h-auto"
          />
        </div>

        {/* --- DESKTOP SEARCH --- */}
        <div className="hidden md:flex items-center bg-[rgba(245,245,245,1)] px-4 py-2 rounded-md flex-1 max-w-[372px] min-w-0 ">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none w-full min-w-0 text-gray-600 placeholder-gray-400 text-sm"
          />
        </div>

        {/* --- DESKTOP LINKS & ICONS --- */}
        <div className="hidden md:flex items-center gap-6 md:gap-12 text-base font-medium">
          <Link href="/" className="hover:text-gray-600 transition">Home</Link>
          <Link href="/about" className="opacity-30 hover:opacity-100 transition">About</Link>
          <Link href="/contact" className="opacity-30 hover:opacity-100 transition">Contact</Link>
          <Link href="/blog" className="opacity-30 hover:opacity-100 transition">Blog</Link>

          <div className="flex items-center gap-4 md:gap-8 ml-4 md:ml-8">
            <FiHeart className="text-xl cursor-pointer hover:text-red-400 transition" />

            {/* 4. UPDATED DESKTOP CART ICON */}
            <Link href="/Cart/cart"> {/* Links to your cart page */}
              <div className="relative">
                <FiShoppingCart className="text-xl cursor-pointer hover:text-yellow-400 transition" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-2 -right-2 
                               flex items-center justify-center 
                               w-5 h-5 
                               bg-red-500 text-white 
                               text-xs font-bold 
                               rounded-full"
                  >
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>

            <FiUser className="text-xl cursor-pointer hover:text-blue-400 transition" />
          </div>
        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {menuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white shadow-md flex flex-col items-center py-6 gap-5 md:hidden">

          {/* Search Bar for Mobile */}
          <div className="flex items-center bg-[rgba(245,245,245,1)] px-4 py-2 rounded-md w-[85%]">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none w-full text-gray-600 placeholder-gray-400 text-sm"
            />
          </div>

          {/* Links */}
          <Link href="/" className="  hover:text-gray-600  transition">Home</Link>
          <Link href="/about" className="opacity-70 hover:opacity-100 transition">About</Link>
          <Link href="/contact" className="opacity-70 hover:opacity-100 transition">Contact</Link>
          <Link href="/blog" className="opacity-70 hover:opacity-100 transition">Blog</Link>

          {/* Icons */}
          <div className="flex items-center gap-6 mt-2">
            <FiHeart className="text-xl cursor-pointer hover:text-red-400 transition" />

            {/* 5. UPDATED MOBILE CART ICON */}
            <Link href="/Cart/cart"> {/* Links to your cart page */}
              <div className="relative">
                <FiShoppingCart className="text-xl cursor-pointer hover:text-yellow-400 transition" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-2 -right-2 
                               flex items-center justify-center 
                               w-5 h-5 
                               bg-red-500 text-white 
                               text-xs font-bold 
                               rounded-full"
                  >
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>

            <FiUser className="text-xl cursor-pointer hover:text-blue-400 transition" />
          </div>
        </div>
      )}
    </nav>
  );
}