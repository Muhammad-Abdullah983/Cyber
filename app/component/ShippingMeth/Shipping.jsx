"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, MapPin } from "lucide-react";

const StepHeader = () => {
    return (
        <div className="flex justify-between items-center mr-12 sm:mt-6  sm:mb-25 mb-18">
            <div className="flex items-center hidden sm:block text-center">
                <div className="w-7 h-7 rounded-full bg-gray-200 text-black flex items-center justify-center">
                    <MapPin size={14} />
                </div>
                <div className="ml-2">
                    <p className="font-medium text-[#B2B2B2] mt-2">Step 1</p>
                    <p className="text-sm text-[#B2B2B2] font-medium">Address</p>
                </div>
            </div>

            <div className="flex items-center text-center text-gray-400">
                <div className="w-8 h-8 flex items-center  justify-center">
                    <img src="/images/edit.png" alt="" />
                </div>
                <div className="ml-2 text-black">
                    <p className="font-medium pr-8 mt-2">Step 2</p>
                    <p className="text-lg font-semibold">Shipping</p>
                </div>
            </div>

            <div className="flex items-center text-center text-gray-400">
                <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/images/payment-12.svg" alt="" />
                </div>
                <div className="ml-2 text-[#B2B2B2]">
                    <p className="font-semibold mt-2">Step 3</p>
                    <p className="text-[19px] sm:text-sm">Payment</p>
                </div>
            </div>
        </div>
    );
};

export default function Shipping() {
    const [selectedMethod, setSelectedMethod] = useState("free");
    const router = useRouter();

    // ⭐ SAVE SHIPPING + MOVE TO PAYMENT
    const handleNext = () => {

        // Save to checkout flow
        localStorage.setItem("checkout_shipping", JSON.stringify({
            method: selectedMethod
        }));

        // Go to Payment page
        router.push("/PaymentSection/Payment");
    };

    return (
        <div className="max-w-[100%] sm:max-w-[80%] mx-auto py-10 px-4">
            <StepHeader />

            <h2 className="text-[20px] text-[#17183B] font-semibold mb-6">Shipment Method</h2>

            <div className="space-y-4">

                {/* FREE */}
                <label
                    className={`flex items-center gap-4 border p-5 rounded-[11px] border  cursor-pointer
                    ${selectedMethod === "free" ? "border-black bg-white text-[#17183B]" : "border-[#D1D1D8] text-[#A2A3B1]"}`}
                >
                    <input
                        type="radio"
                        name="shipping"
                        value="free"
                        checked={selectedMethod === "free"}
                        onChange={() => setSelectedMethod("free")}
                        className="hidden"
                    />
                    <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
                        {selectedMethod === "free" && (
                            <div className="w-3.5 h-3.5 bg-black rounded-full"></div>
                        )}
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold">Free</span>
                        <span className="ml-2">Regular shipment</span>
                    </div>
                    <span className="text-sm font-semibold">17 Oct, 2023</span>
                </label>

                {/* FAST */}
                <label
                    className={`flex items-center gap-4  p-5 rounded-[11px] border cursor-pointer
                    ${selectedMethod === "fast" ? "border-black bg-white text-[#17183B]" : "border-[#D1D1D8] text-[#A2A3B1]"}`}
                >
                    <input
                        type="radio"
                        name="shipping"
                        value="fast"
                        checked={selectedMethod === "fast"}
                        onChange={() => setSelectedMethod("fast")}
                        className="hidden"
                    />
                    <div className="w-6 h-6 border-2  rounded-full flex items-center justify-center">
                        {selectedMethod === "fast" && (
                            <div className="w-3.5 h-3.5 bg-black rounded-full"></div>
                        )}
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold">$8.50</span>
                        <span className="ml-2">Get your delivery as soon as possible</span>
                    </div>
                    <span className="text-sm font-semibold">1 Oct, 2023</span>
                </label>

                {/* SCHEDULE */}
                <label
                    className={`flex items-center gap-4  p-5 rounded-[11px] border cursor-pointer
                    ${selectedMethod === "schedule" ? "border-black bg-white text-[#17183B]" : "border-[#D1D1D8] text-[#A2A3B1]"}`}
                >
                    <input
                        type="radio"
                        name="shipping"
                        value="schedule"
                        checked={selectedMethod === "schedule"}
                        onChange={() => setSelectedMethod("schedule")}
                        className="hidden"
                    />
                    <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
                        {selectedMethod === "schedule" && (
                            <div className="w-3.5 h-3.5 bg-black rounded-full"></div>
                        )}
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold">Schedule</span>
                        <span className="ml-2">Pick a date when you want delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        Select Date
                        <ChevronDown size={16} />
                    </div>
                </label>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-6 mt-6 border-t pt-6">

                <button
                    onClick={() => router.back()}
                    className="border border-gray-800 rounded-md w-[200px] px-6 py-3 text-base text-black font-medium hover:bg-gray-400">
                    Back
                </button>

                <button
                    onClick={handleNext}
                    className="bg-black text-white rounded-md px-6 w-[200px] py-3 text-base font-medium hover:bg-gray-800"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
