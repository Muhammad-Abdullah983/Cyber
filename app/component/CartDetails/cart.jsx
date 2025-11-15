"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    // 1. Initialize cart state as empty
    const [cart, setCart] = useState([]);

    // 2. Add a new state to track if we've loaded from localStorage
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage ONCE on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("cart");
            if (saved) {
                setCart(JSON.parse(saved));
            }
        } catch (e) {
            console.warn("Failed to parse cart from localStorage", e);
        }
        // 3. Mark as loaded *after* trying to load
        setIsLoaded(true);
    }, []); // Empty dependency array means this runs only once

    // Save cart to localStorage whenever 'cart' changes
    useEffect(() => {
        // 4. Only save to localStorage *after* we have loaded the initial state
        if (isLoaded) {
            try {
                localStorage.setItem("cart", JSON.stringify(cart));
            } catch (e) {
                console.warn("Failed to save cart to localStorage", e);
            }
        }
    }, [cart, isLoaded]); // Runs when cart or isLoaded changes

    // Add to cart
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

    // 5. Do not render children until the cart has been loaded
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