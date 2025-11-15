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
    const formatPrice = (price) => {
        // This will format $1399 as $1,399
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto max-w-6xl px-4 py-12">

                {/* Main Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* --- LEFT COLUMN: SHOPPING CART --- */}
                    <div className=" ">
                        <h1 className="text-2xl text-black font-semibold mb-8">Shopping Cart</h1>

                        {cart.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 mb-4 text-lg">Your cart is empty.</p>
                                <button
                                    onClick={() => router.push("/")}
                                    className="px-6 py-3 bg-black text-white rounded-lg font-medium"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-6 border-b border-gray-200 pb-8"
                                    >
                                        {/* Image */}
                                        <div className="w-24 h-24 flex-shrink-0">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-full h-full rounded-lg object-cover bg-gray-100 p-1"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-base text-gray-900">{item.title}</h3>

                                            <p className="text-gray-400 text-xs mt-1">#{item.id}</p>
                                        </div>

                                        {/* Quantity */}
                                        <div className="flex items-center gap-4">
                                            <button
                                                className="text-2xl text-gray-900 hover:text-black disabled:opacity-50"
                                                onClick={() => updateQuantity(item.id, item.qty - 1)}
                                                disabled={item.qty <= 1}
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="text-lg font-medium w-8 text-center text-gray-800 border rounded-sm border-gray-200">{item.qty}</span>
                                            <button
                                                className="text-2xl text-gray-900 hover:text-black"
                                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div className="w-20 text-right">
                                            <p className="text-lg font-semibold text-black">{formatPrice(item.price * item.qty)}</p>
                                        </div>

                                        {/* Remove Button */}
                                        <div className="w-8 text-right">
                                            <button
                                                className="text-2xl text-gray-900 hover:text-red-500 transition-colors"
                                                onClick={() => removeFromCart(item.id)}
                                                aria-label="Remove item"
                                            >
                                                <IoClose />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
                    <div className="lg:col-span-1 ">
                        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
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
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4  py-1 border border-gray-900 rounded-md text-[12px] font-medium text-black hover:bg-gray-200">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Price Lines */}
                            <div className="space-y-4 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Tax</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Shipping & Handling</span>
                                    <span>{formatPrice(shipping)}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between text-lg font-semibold text-gray-900">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                className="w-full bg-black text-white py-3 rounded-lg mt-8 font-medium text-lg hover:bg-gray-800 transition-colors"
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