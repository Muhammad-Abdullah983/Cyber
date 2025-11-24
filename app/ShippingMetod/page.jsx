"use client";

import React from "react";
import Shipping from "../component/ShippingMeth/Shipping";
import ProtectedRoute from "../component/ProtectedRoute";

export default function ShippingPage() {
    return (
        <ProtectedRoute>
            <main>
                <Shipping />
            </main>
        </ProtectedRoute>
    );
}