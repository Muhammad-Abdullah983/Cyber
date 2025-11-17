"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../component/CartDetails/cart"; // Make sure this path is correct
import { IoClose } from "react-icons/io5"; // Import the close icon

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const router = useRouter();

    const subtotal = cart.reduce((sum, it) => sum + it.price * it.qty, 0);

    // --- These are estimates from your image ---
    const tax = subtotal > 0 ? 50 : 0;
    const shipping = subtotal > 0 ? 29 : 0;
    // ------------------------------------------

    const total = subtotal + tax + shipping;

    // Helper to format prices
    // Always show two decimal places so cents are never hidden (e.g. $99.00)
    const formatPrice = (price) => {
        const withoutDecimals = Math.floor(Number(price));

        return withoutDecimals.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto sm:max-w-[83%] px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* --- LEFT COLUMN: SHOPPING CART --- */}
                    <div>
                        <h1 className="text-2xl text-black font-semibold mb-8">Shopping Cart</h1>
                        {cart.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 mb-4 text-lg">Your cart is empty.</p>
                                <button
                                    onClick={() => simulateNavigation("/")}
                                    className="px-6 py-3 bg-black text-white rounded-lg font-medium"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8 ">
                                {cart.map((item) => (
                                    // --- THIS IS THE START OF THE EDITED SECTION ---
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 sm:gap-6 border-b border-[#A3A3A3] pb-8"
                                    >
                                        {/* 1. Image */}
                                        <div className="w-24 h-24 flex-shrink-0">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-full h-full rounded-lg object-cover p-1"
                                            />
                                        </div>

                                        {/* 2. Item Name/ID */}
                                        <div className="sm:flex sm:gap-8">
                                            <div className="flex-1 sm:w-[155px]">
                                                <h3 className="font-semibold text-base text-gray-900 " title={item.title}>
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-400 text-xs mt-1">#{item.id}</p>
                                            </div>

                                            {/* 3. Quantity Selector */}
                                            <div className="flex items-center">
                                                <div className="flex items-center gap-4 flex-shrink-0">
                                                    <button
                                                        className="text-2xl text-gray-900 hover:text-black disabled:opacity-50 cursor-pointer"
                                                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                                                        disabled={item.qty <= 1}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-base font-medium px-1.5 py-0.7 text-center text-black border rounded-sm border-gray-200">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        className="text-2xl text-gray-900 hover:text-black cursor-pointer"
                                                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                                                        aria-label="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* 4. Price */}
                                                <div className="flex-shrink-0 w-24 sm:text-center text-right ">
                                                    <p className="text-lg font-semibold text-black">
                                                        {formatPrice(item.price * item.qty)}
                                                    </p>
                                                </div>

                                                {/* 5. Remove Button */}
                                                <div className="flex-shrink-0">
                                                    <button
                                                        // Replaced icon with "X" and adjusted styling
                                                        className="text-base font-medium  ml-6 sm:ml-0 text-gray-700 hover:text-red-500 transition-colors w-5 h-5 flex items-center justify-center"
                                                        onClick={() => removeFromCart(item.id)}
                                                        aria-label="Remove item"
                                                    >
                                                        <img src="/images/Close.svg" alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    // --- THIS IS THE END OF THE EDITED SECTION ---
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
                    <div className="lg:col-span-1 ">
                        <div className="bg-white sm:p-12 p-4 rounded-lg border border-gray-200 ">
                            <h2 className="text-xl text-black font-semibold mb-6">Order Summary</h2>

                            {/* Discount Code */}
                            <div className="mb-4">
                                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                                    Discount code / Promo code
                                </label>
                                <input
                                    type="text"
                                    id="discount"
                                    placeholder="Code"
                                    className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Bonus Card */}
                            <div className="mb-6">
                                <label htmlFor="bonus" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your bonus card number
                                </label>

                                {/* This parent div holds both the input and the button */}
                                <div className="relative w-full">

                                    {/* The Input field */}
                                    <input
                                        type="text"
                                        id="bonus"
                                        placeholder="Enter Card Number"
                                        className="w-full px-4 py-4 text-black text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black "
                                    />

                                    {/* The Apply Button */}
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 border border-black rounded-md text-[12px] font-medium text-black hover:bg-gray-200">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Price Lines */}
                            <div className="space-y-4 text-gray-700">
                                <div className="flex justify-between text-base text-black font-semibold mb-6    ">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#545454] text-base">Estimated Tax</span>
                                    <span className="font-semibold text-black">{formatPrice(tax)}</span>
                                </div>
                                <div className="flex justify-between mb-6">
                                    <span className="text-[#545454] text-base">Estimated Shipping & Handling</span>
                                    <span className="font-semibold text-black">{formatPrice(shipping)}</span>
                                </div>

                                <div className="flex justify-between text-base font-semibold text-black ">
                                    <span>Total</span>
                                    <span className="font-semibold text-black">{formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                className="w-full bg-black text-white py-3 rounded-lg mt-8 mb-8 sm:mb-0 font-medium text-lg hover:bg-gray-800 transition-colors mt-12"
                                onClick={() => router.push("/AddressInformation")}
                                disabled={cart.length === 0}
                            >
                                Checkout
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
