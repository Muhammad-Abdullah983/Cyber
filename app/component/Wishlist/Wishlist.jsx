"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/app/component/AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const storageKey = user && user.uid ? `wishlist:${user.uid}` : "wishlist:anon";

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
      setWishlist(saved);
    } catch (e) {
      console.warn("Failed to parse wishlist from localStorage", e);
      setWishlist([]);
    }
  }, [storageKey]);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const exists = prev.includes(id);
      const updated = exists
        ? prev.filter(item => item !== id)
        : [...prev, id];

      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save wishlist to localStorage", e);
      }

      return updated;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
