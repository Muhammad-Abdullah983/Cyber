"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    // Hide navbar and footer on auth pages
    const isAuthPage = pathname.startsWith("/Auth");

    return (
        <>
            {!isAuthPage && <Navbar />}
            <main>{children}</main>
            {!isAuthPage && <Footer />}
        </>
    );
}
