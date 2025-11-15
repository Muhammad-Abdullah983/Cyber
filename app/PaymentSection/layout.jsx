import "../globals.css";
import { CartProvider } from "../component/CartDetails/cart";
// Import fonts (example)
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>


                <CartProvider>

                    <main>{children}</main>
                    {/* You could add a Footer component here if you have one */}
                </CartProvider>
            </body>
        </html>
    );
}