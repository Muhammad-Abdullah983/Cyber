"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, MapPin } from "lucide-react";
import { useRouter } from "next/navigation"; // Import router

const StepHeader = () => {
    return (
        <div className=" flex justify-between gap-18 sm:gap-0 items-center mr-12 sm:mt-6 sm:mb-25 mb-14">
            <div className="flex items-center text-center">
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                    <MapPin size={14} />
                </div>
                <div className="ml-2">
                    <p className="font-medium text-black mt-2">Step 1</p>
                    <p className="text-lg text-gray-900 font-semibold">Address</p>
                </div>
            </div>

            <div className="flex items-center text-center text-gray-400">
                <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/images/shipping.svg" alt="" />
                </div>
                <div className="ml-2 text-[#B2B2B2]">
                    <p className="font-semibold mt-2">Step 2</p>
                    <p className="text-base">Shipping</p>
                </div>
            </div>

            <div className="flex items-center sm:block hidden text-center text-gray-400">
                <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/images/payment.svg" alt="" />
                </div>
                <div className="ml-2 text-[#B2B2B2]">
                    <p className="font-semibold mt-2">Step 3</p>
                    <p className="text-sm">Payment</p>
                </div>
            </div>
        </div>
    );
};

export default function Address({
    addresses,
    selected,
    setSelected,
    addAddress,
    deleteAddress,
    updateAddress,
}) {
    const router = useRouter(); // Next.js router

    // FORM STATE
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        type: "HOME",
        address: "",
        phone: "",
    });

    // Disable scroll when form is open
    useEffect(() => {
        document.body.style.overflow = showForm ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [showForm]);

    // OPEN EDIT MODE
    const handleEdit = (item) => {
        setIsEditing(true);
        setEditId(item.id);
        setFormData({
            title: item.title,
            type: item.type,
            address: item.address,
            phone: item.phone,
        });
        setShowForm(true); // open modal
    };

    // SAVE NEW + EDITED ADDRESS
    const handleSave = () => {
        if (!formData.title || !formData.address || !formData.phone) return;

        if (isEditing) {
            updateAddress(editId, formData);
        } else {
            addAddress({
                id: Date.now(),
                ...formData,
            });
        }

        // RESET
        setFormData({ title: "", type: "HOME", address: "", phone: "" });
        setShowForm(false);
        setIsEditing(false);
    };

    // HANDLE NEXT BUTTON
    // HANDLE NEXT BUTTON
    const handleNext = () => {
        if (!selected) {
            alert("Please select an address to continue!");
            return;
        }

        // Find selected address
        const selectedAddress = addresses.find((item) => item.id === selected);

        // ⭐ Save to checkout flow (important)
        localStorage.setItem("checkout_address", JSON.stringify(selectedAddress));

        // Go to Shipping page
        router.push("/ShippingMetod");
    };

    return (
        <div className="max-w-[100%] sm:max-w-[80%] mx-auto py-10 px-4">
            <StepHeader />

            <h2 className="text-[20px] text-black font-semibold mb-6">Select Address</h2>

            <div className="space-y-4">
                {addresses.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#F6F6F6] p-5 rounded-md border w-full border-gray-200 flex justify-between"
                    >
                        <label className="flex gap-4 cursor-pointer w-full">
                            <input
                                type="radio"
                                name="address"
                                checked={selected === item.id}
                                onChange={() => setSelected(item.id)}
                                className="hidden"
                            />

                            {/* Custom Radio */}
                            <div className="w-6 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center mt-1">
                                {selected === item.id && (
                                    <div className="w-3 h-3 bg-black rounded-full"></div>
                                )}
                            </div>

                            <div className="w-full">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-medium text-[#17183B] text-lg">{item.title}</h3>
                                    <span className="text-xs px-2 py-0.5 bg-black text-white rounded font-medium">
                                        {item.type}
                                    </span>
                                </div>
                                <p className="text-sm text-[#17183B] mt-2">{item.address}</p>
                                <p className="text-sm text-[#17183B] mt-1">{item.phone}</p>
                            </div>
                        </label>

                        <div className="flex gap-6 items-start pt-7">
                            <button onClick={() => handleEdit(item)} className="text-gray-900  hover:cursor-pointer">
                                <img src="/images/Edit-icon.svg" alt="" className="h-6 w-8  ml-2" />
                            </button>

                            <button
                                onClick={() => deleteAddress(item.id)}
                                className="text-gray-900 hover:text-red-500  pt-1 hover:cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {!showForm && (
                <div className="relative flex flex-col items-center mt-8 w-full">
                    {/* Dotted Line */}
                    <div className="w-full border-t-1 border-dashed border-gray-300 absolute top-1/2 left-0"></div>

                    {/* Circle Button */}
                    <button
                        onClick={() => {
                            setShowForm(true);
                            setIsEditing(false);
                        }}
                        className="relative z-8 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center translate-y-6 hover:bg-white hover:text-black border-2 border-black"
                    >
                        <Plus size={18} />
                    </button>

                    <span className="text-sm text-black font-medium mt-7">Add New Address</span>
                </div>
            )}

            <div className="flex justify-end gap-6 mt-6 border-t pt-6">

                <button
                    onClick={() => router.back()}

                    className="border border-gray-800 rounded-md w-[200px] px-6 py-3 text-base text-black font-medium hover:bg-gray-400">
                    Back
                </button>
                <button
                    onClick={handleNext}
                    className="bg-black text-white rounded-md w-[200px] px-6 py-3 text-base font-medium hover:bg-gray-800"
                >
                    Next
                </button>
            </div>

            {/* MODAL */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-sm sm:max-w-md">
                        <h3 className="text-lg text-black font-semibold mb-4">
                            {isEditing ? "Edit Address" : "Add New Address"}
                        </h3>

                        <input
                            placeholder="Country Name..."
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border p-2 text-black rounded mb-3"
                        />

                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full border p-2 text-black rounded mb-3"
                        >
                            <option value="HOME">HOME</option>
                            <option value="OFFICE">OFFICE</option>
                        </select>

                        <textarea
                            placeholder="Full address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full border p-2 text-black rounded mb-3"
                        />

                        <input
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full border p-2 text-black rounded mb-3"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setIsEditing(false);
                                }}
                                className="px-6 py-2 bg-black border rounded-md"
                            >
                                Cancel
                            </button>

                            <button onClick={handleSave} className="px-8 py-2 bg-black text-white rounded-md">
                                {isEditing ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
