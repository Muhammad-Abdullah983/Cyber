// global css import '
import "../globals.css";
import { CartProvider } from "../component/CartDetails/cart";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
           
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
