"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Address from "../component/Adresss/useraddress";

export default function AddressPage() {
    const [addresses, setAddresses] = useState([]);
    const [selected, setSelected] = useState(null);

    const router = useRouter();

    // LOAD FROM LOCAL STORAGE
    useEffect(() => {
        const saved = localStorage.getItem("my-addresses");
        if (saved) {
            const parsed = JSON.parse(saved);
            setAddresses(parsed);

            if (parsed.length > 0) {
                setSelected(parsed[0].id);
            }
        }
    }, []);

    // ADD NEW
    const addAddress = (newAddress) => {
        const updated = [...addresses, newAddress];
        setAddresses(updated);
        localStorage.setItem("my-addresses", JSON.stringify(updated));
    };

    // DELETE
    const deleteAddress = (id) => {
        const updated = addresses.filter((item) => item.id !== id);
        setAddresses(updated);
        localStorage.setItem("my-addresses", JSON.stringify(updated));

        if (selected === id && updated.length > 0) {
            setSelected(updated[0].id);
        }
    };

    // UPDATE (EDIT)
    const updateAddress = (id, updatedData) => {
        const updated = addresses.map((item) =>
            item.id === id ? { ...item, ...updatedData } : item
        );

        setAddresses(updated);
        localStorage.setItem("my-addresses", JSON.stringify(updated));
    };

    // 🚀 THIS RUNS WHEN USER PROCEEDS TO SHIPPING
    const handleContinue = () => {
        const selectedAddress = addresses.find(a => a.id === selected);

        if (!selectedAddress) {
            alert("Please select an address");
            return;
        }

        // Store in checkout flow
        localStorage.setItem("checkout_address", JSON.stringify(selectedAddress));

        router.push("/checkout/shipping");
    };

    return (
        <div>
            <Address
                addresses={addresses}
                selected={selected}
                setSelected={setSelected}
                addAddress={addAddress}
                deleteAddress={deleteAddress}
                updateAddress={updateAddress}

                // ⭐ PASS THE CONTINUE HANDLER TO CHILD
                onContinue={handleContinue}
            />
        </div>
    );
}
