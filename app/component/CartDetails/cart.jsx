"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/app/component/AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
    // Use auth to namespace storage per-user so different accounts have separate carts
    const { user } = useAuth();
    const storageKey = user && user.uid ? `cart:${user.uid}` : "cart:anon";

    // 1. Initialize cart state as empty
    const [cart, setCart] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart for the current storageKey whenever it changes (user signs in/out)
    useEffect(() => {
        setIsLoaded(false);
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                setCart(JSON.parse(saved));
            } else {
                setCart([]);
            }
        } catch (e) {
            console.warn("Failed to parse cart from localStorage", e);
            setCart([]);
        }
        // Mark as loaded *after* trying to load
        setIsLoaded(true);
    }, [storageKey]);

    useEffect(() => {
        // Only save to localStorage *after* we have loaded the initial state
        if (isLoaded) {
            try {
                localStorage.setItem(storageKey, JSON.stringify(cart));
            } catch (e) {
                console.warn("Failed to save cart to localStorage", e);
            }
        }
    }, [cart, isLoaded, storageKey]); // Runs when cart or isLoaded or storageKey changes
    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };
    // Update quantity (Fixed a bug here)
    const updateQuantity = (id, qty) => {
        setCart((prev) =>
            prev.map((item) =>
                // BUG FIX: You were using 'quantity' here but 'qty' in addToCart
                item.id === id ? { ...item, qty: Math.max(1, qty) } : item
            )
        );
    };

    // Remove item
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };
    const clearCart = () => setCart([]);

    if (!isLoaded) {
        return null; // Or return a <LoadingSpinner />
    }
    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);