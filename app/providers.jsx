"use client";

import { CartProvider } from "./component/CartDetails/cart";
import { WishlistProvider } from "./component/Wishlist/Wishlist";
import { AuthProvider } from "./component/AuthContext";
import LayoutWrapper from "./component/LayoutWrapper";

export function Providers({ children }) {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <LayoutWrapper>
                        {children}
                    </LayoutWrapper>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}
