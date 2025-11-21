import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { CartProvider } from "./component/CartDetails/cart";
import { WishlistProvider } from "./component/Wishlist/Wishlist";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cyber",
  description: "Modern Tech Website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main>
              {children}
              </main>
          </WishlistProvider>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
