"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { useCart } from "../CartDetails/cart";

// --- PRICE FORMATTER (no decimals, no rounding) ---
const formatPrice = (price) => {
    const withoutDecimals = Math.floor(Number(price)); // remove everything after .
    return withoutDecimals.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

// --- Step Header Component ---
const StepHeader = () => {
    return (
        <div className="flex justify-between   items-center  mr-12 sm:mt-6 mb-14 sm:mb-25">
            <div className="flex items-center hidden sm:flex sm:text-left text-left">
                <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center">
                    <MapPin size={14} />
                </div>
                <div className="ml-2 text-[#B2B2B2]">
                    <p className="font-medium mt-2">Step 1</p>
                    <p className="text-base font-semibold">Address</p>
                </div>
            </div>

            <div className="flex items-center text-left text-gray-400">
                <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/images/shipping.svg" alt="" />
                </div>
                <div className="ml-2 text-[#B2B2B2]">
                    <p className="font-semibold mt-2">Step 2</p>
                    <p className="text-sm">Shipping</p>
                </div>
            </div>

            <div className="flex items-center text-left text-gray-400">
                <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/images/payment-black.svg" alt="" />
                </div>
                <div className="ml-2 text-black">
                    <p className="font-semibold mt-2">Step 3</p>
                    <p className="text-base font-semibold">Payment</p>
                </div>
            </div>
        </div>
    );
};

// --- Main Payment Page Component ---
export default function PaymentSection() {
    const { cart } = useCart();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("credit");

    const [savedAddress, setSavedAddress] = useState(null);
    const [savedShipping, setSavedShipping] = useState(null);

    useEffect(() => {
        const keysToTry = ["checkout_address", "selectedAddress", "selected_address", "my-addresses"];
        let found = null;
        for (const k of keysToTry) {
            const v = localStorage.getItem(k);
            if (v) {
                try {
                    const parsed = JSON.parse(v);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        found = parsed[0];
                    } else {
                        found = parsed;
                    }
                } catch {
                    found = v;
                }
                break;
            }
        }
        if (found) setSavedAddress(found);

        const shippingRaw = localStorage.getItem("checkout_shipping");
        if (shippingRaw) {
            try {
                const parsed = JSON.parse(shippingRaw);
                setSavedShipping(parsed);
            } catch {
                setSavedShipping(shippingRaw);
            }
        }
    }, []);

    // --- Calculations ---
    const subtotal = cart.reduce((sum, it) => sum + (it.price || 0) * (it.qty || it.quantity || 1), 0);
    const tax = 50;

    let shippingPrice = 29;
    let shippingLabel = "Estimated Shipping";

    if (savedShipping) {
        if (typeof savedShipping === "string") {
            shippingLabel = savedShipping;
        } else if (savedShipping.method) {
            switch (savedShipping.method) {
                case "free":
                    shippingLabel = "Free (Regular)";
                    shippingPrice = 0;
                    break;
                case "fast":
                    shippingLabel = "Fast Delivery";
                    shippingPrice = 8.5;
                    break;
                case "schedule":
                    shippingLabel = "Scheduled Delivery";
                    shippingPrice = 0;
                    break;
                default:
                    shippingLabel = savedShipping.name || "Shipping";
                    shippingPrice = savedShipping.price ?? shippingPrice;
            }
        } else {
            shippingLabel = savedShipping.name || shippingLabel;
            shippingPrice = savedShipping.price ?? shippingPrice;
        }
    }

    const shipping = shippingPrice;
    const total = subtotal + tax + shipping;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <StepHeader />
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-16">

                {/* LEFT COLUMN */}
                <div className="lg:col-span-3 hidden sm:block flex flex-col">
                    <h2 className="text-[20px] text-black font-medium mb-6">Summary</h2>

                    {/* Cart Items */}
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 bg-[#F6F6F6] p-3 rounded-lg shadow-sm">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-black text-sm">{item.title}</h3>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-black text-lg">
                                        {formatPrice(item.price)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Qty: {item.qty || item.quantity || 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Details */}
                    <div className="border-t mt-6 pt-6 space-y-4 text-sm">
                        {/* ADDRESS */}
                        <div>
                            <h4 className="font-medium text-[#545454] text-sm mb-3">Address</h4>
                            {savedAddress ? (
                                typeof savedAddress === "string" ? (
                                    <p className="text-black">{savedAddress}</p>
                                ) : (
                                    <p className="text-black">
                                        {savedAddress.title && `${savedAddress.title}${savedAddress.type ? ` — ${savedAddress.type}` : ""}, `}
                                        {savedAddress.address && `${savedAddress.address}, `}
                                        {savedAddress.phone && `${savedAddress.phone}`}
                                        {(!savedAddress.title && savedAddress.fullName) &&
                                            `${savedAddress.fullName}, ${savedAddress.street}, ${savedAddress.city} ${savedAddress.state} ${savedAddress.zip}`}
                                    </p>
                                )
                            ) : (
                                <p className="text-gray-600">No address selected.</p>
                            )}
                        </div>

                        {/* SHIPPING METHOD */}
                        <div>
                            <h4 className="font-medium text-[#545454] text-sm mt-8 mb-3">Shipment method</h4>
                            <p className="text-black">
                                {savedShipping ? (
                                    typeof savedShipping === "string" ? (
                                        `${savedShipping} — ${formatPrice(shippingPrice)}`
                                    ) : (
                                        savedShipping.method ? (
                                            `${shippingLabel}${shippingPrice ? ` — ${formatPrice(shippingPrice)}` : ""}`
                                        ) : (
                                            `${savedShipping.name || "Shipping"}${savedShipping.price ? ` — ${formatPrice(savedShipping.price)}` : ""}`
                                        )
                                    )
                                ) : (
                                    "No shipping selected."
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="mt-6 pt-6 text-black space-y-5">
                        <div className="flex justify-between text-sm">
                            <span className="text-black text-base">Subtotal</span>
                            <span className="font-semibold text-black">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Estimated Tax</span>
                            <span className="font-semibold">{formatPrice(tax)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Estimated Shipping & Handling</span>
                            <span className="font-semibold">{formatPrice(shipping)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-2">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-3 flex flex-col">
                    <h2 className="text-[20px] text-black font-bold mb-6">Payment</h2>

                    {/* Payment Tabs */}
                    <div className="flex gap-8 border-b mb-6">
                        <button
                            onClick={() => setPaymentMethod("credit")}
                            className={`pb-2 font-medium ${paymentMethod === "credit" ? "border-b-2 border-black text-black" : "text-gray-400"}`}
                        >
                            Credit Card
                        </button>
                        <button
                            onClick={() => setPaymentMethod("paypal")}
                            className={`pb-2 font-medium ${paymentMethod === "paypal" ? "border-b-2 border-black text-black" : "text-[#717171]"}`}
                        >
                            PayPal
                        </button>
                        <button
                            onClick={() => setPaymentMethod("paypal_credit")}
                            className={`pb-2 font-medium ${paymentMethod === "paypal_credit" ? "border-b-2 border-black text-black" : "text-[#717171]"}`}
                        >
                            PayPal Credit
                        </button>
                    </div>

                    {/* Credit Card Form */}
                    {paymentMethod === "credit" && (
                        <div className="space-y-6">
                            <img src="/images/atm-card.svg" alt="" />

                            <div className="space-y-4 mt-10">
                                <div>
                                    <input type="text" placeholder="Cardholder Name" className="w-full p-3 text-[#979797] text-sm border border-gray-300 rounded-lg" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 text-[#979797] text-sm rounded-lg" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input type="text" placeholder="Exp.Date" className="w-full p-3 text-[#979797] text-sm border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <input type="text" placeholder="CVV" className="w-full p-3 text-[#979797] text-sm border border-gray-300 rounded-lg" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-14">
                                <input type="checkbox" className="w-4 h-4 accent-black" />
                                <label className="text-[15px] text-black font-medium">Same as billing address</label>
                            </div>
                        </div>
                    )}

                    {/* Footer Buttons */}
                    <div className="flex justify-between items-center mt-12 border-t pt-4">
                        <button
                            onClick={() => router.back()}
                            className="w-[48%] border text-black border-gray-300 rounded-lg px-8 py-3 text-base font-medium hover:bg-gray-300"
                        >
                            Back
                        </button>
                        <button className="w-[48%] bg-black text-white rounded-lg px-12 py-3 text-base font-medium hover:bg-gray-800">
                            Pay
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
