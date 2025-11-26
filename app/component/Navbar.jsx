"use client";

import { FiHeart, FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartDetails/cart";
import { useWishlist } from "./Wishlist/Wishlist";
import { useAuth } from "./AuthContext";
// Auth links removed from navbar per request

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  return (
    <nav className="w-full bg-white text-black border-b border-b-[#B5B5B5] gap-10 py-4 relative z-50">
      <div className="container mx-auto w-[90%] sm:w-[80%] max-w-7xl flex items-center justify-between md:gap-11">

        {/* LOGO */}
        <div className="flex items-center shrink-0">
          <Image
            src="/images/Cyber.svg"
            alt="Cyber Logo"
            width={66}
            height={50}
            className="object-contain w-[100px] sm:w-[75px] md:w-[75px] h-auto"
          />
        </div>

        {/* DESKTOP SEARCH */}
        <div className="hidden md:flex items-center bg-[rgba(245,245,245,1)] px-4 py-2 rounded-md flex-1 max-w-[372px] min-w-0">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none w-full min-w-0 text-gray-600 placeholder-gray-400 text-sm"
          />
        </div>

        {/* DESKTOP NAVIGATION & ICONS */}
        <div className="hidden md:flex items-center gap-6 md:gap-12 text-base font-medium">
          <Link href="/" className="hover:text-gray-600 transition">Home</Link>
          <Link href="/about" className="opacity-30 hover:opacity-100 transition">About</Link>
          <Link href="/contact" className="opacity-30 hover:opacity-100 transition">Contact</Link>
          <Link href="/blog" className="opacity-30 hover:opacity-100 transition">Blog</Link>

          {/* DESKTOP ICONS */}
          <div className="flex items-center gap-4 md:gap-8 ml-4 md:ml-8">

            {/* WISHLIST ICON */}
            <Link href="/wishlistPage">
              <div className="relative cursor-pointer">
                {wishlistCount > 0 ? (
                  <FaHeart className="text-xl text-red-500 transition-colors duration-300" />
                ) : (
                  <FiHeart className="text-xl text-gray-600 transition-colors duration-300" />
                )}
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-200 text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* CART ICON */}
            <Link href="/Cart/cart">
              <div className="relative">
                <FiShoppingCart className="text-xl cursor-pointer hover:text-yellow-400 transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>

            {/* USER ACCOUNT ICON - SHOW REAL USER */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="text-xl cursor-pointer hover:text-blue-400 transition flex items-center gap-2"
                  title={user.email}
                >
                  <FiUser />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.displayName || "User"}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="text-xl cursor-pointer hover:text-blue-400 transition"
                  aria-label="Account"
                >
                  <FiUser />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">Welcome</p>
                      <p className="text-xs text-gray-500">Please login or create an account</p>
                    </div>
                    <Link href="/Auth/login" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                    <Link href="/Auth/signup" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-6 gap-5 md:hidden">

          {/* MOBILE SEARCH */}
          <div className="flex items-center bg-[rgba(245,245,245,1)] px-4 py-2 rounded-md w-[85%]">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none w-full text-gray-600 placeholder-gray-400 text-sm"
            />
          </div>

          {/* MOBILE NAVIGATION LINKS */}
          <Link href="/" className="hover:text-gray-600 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" className="opacity-70 hover:opacity-100 transition" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="opacity-70 hover:opacity-100 transition" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/blog" className="opacity-70 hover:opacity-100 transition" onClick={() => setMenuOpen(false)}>Blog</Link>

          {/* MOBILE ICONS */}
          <div className="flex items-center gap-6 mt-2">

            {/* MOBILE WISHLIST ICON */}
            <Link href="/wishlistPage" onClick={() => setMenuOpen(false)}>
              <div className="relative cursor-pointer">
                {wishlistCount > 0 ? (
                  <FaHeart className="text-xl text-red-500 transition-colors duration-300" />
                ) : (
                  <FiHeart className="text-xl text-black transition-colors duration-300" />
                )}
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-200 text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* MOBILE CART ICON */}
            <Link href="/Cart/cart" onClick={() => setMenuOpen(false)}>
              <div className="relative">
                <FiShoppingCart className="text-xl cursor-pointer hover:text-yellow-400 transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            {/* MOBILE USER ACCOUNT ICON */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="text-xl cursor-pointer hover:text-blue-400 transition"
                  title={user.email}
                >
                  <FiUser />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.displayName || "User"}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => {
                        setUserMenuOpen(false);
                        setMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="text-xl cursor-pointer hover:text-blue-400 transition"
                  aria-label="Account"
                >
                  <FiUser />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">Welcome</p>
                      <p className="text-xs text-gray-500">Please login or create an account</p>
                    </div>
                    <Link href="/Auth/login" onClick={() => { setUserMenuOpen(false); setMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                    <Link href="/Auth/signup" onClick={() => { setUserMenuOpen(false); setMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
