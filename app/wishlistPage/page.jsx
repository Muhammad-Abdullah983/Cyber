"use client";

import { useWishlist } from "../component/Wishlist/Wishlist";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function WishlistPage() {
    const { wishlist, toggleWishlist } = useWishlist();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    const clearAllWishlist = () => {
        wishlist.forEach(id => toggleWishlist(id));
    };

    useEffect(() => {
        if (wishlist.length === 0) {
            setProducts([]);
            setLoading(false);
            setInitialLoad(false);
            return;
        }

        // Fetch products based on wishlist IDs
        const fetchProducts = async () => {
            try {
                const productList = await Promise.all(
                    wishlist.map(id =>
                        fetch(`https://dummyjson.com/products/${id}`)
                            .then(r => r.json())
                            .catch(err => {
                                console.error(`Error fetching product ${id}:`, err);
                                return null;
                            })
                    )
                );
                // Filter out any null responses
                setProducts(productList.filter(p => p !== null));
            } catch (error) {
                console.error("Error fetching wishlisted products:", error);
            } finally {
                setLoading(false);
                setInitialLoad(false);
            }
        };

        fetchProducts();
    }, [wishlist]);

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="container mx-auto sm:max-w-[83%] px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">My Wishlist</h1>
                    {wishlist.length > 0 && (
                        <button
                            onClick={clearAllWishlist}
                            className="px-4 py-2 bg-gray-300 text-black rounded-lg font-semibold hover:bg-red-500 transition"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {loading && initialLoad ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Loading...</p>
                    </div>
                ) : wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 mb-4 text-lg">Your wishlist is empty.</p>
                        <Link href="/">
                            <button className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <div
                                key={product.id || index}
                                className="relative w-full bg-[#F6F6F6] shadow-md rounded-[9px] flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-transform duration-300"
                            >
                                {/* Remove from Wishlist Button */}
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className="absolute top-3 right-3 z-10 rounded-full p-2 hover:bg-gray-100 transition"
                                    aria-label="Remove from wishlist"
                                >
                                    <FaHeart className="text-red-500 text-lg" />
                                </button>

                                {/* Product Image */}
                                <div className="relative w-full h-[200px]">
                                    {product.thumbnail ? (
                                        <Image
                                            src={product.thumbnail}
                                            alt={product.title}
                                            fill
                                            className="object-contain p-4"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                                            No image
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="p-4 flex-1 flex flex-col text-black justify-between">
                                    <div className="text-center">
                                        <h2 className="text-base text-gray-900 font-medium line-clamp-2 mb-2">
                                            {product.title}
                                        </h2>
                                        <p className="text-2xl font-semibold text-black">
                                            ${(product.price || 0).toFixed(2)}
                                        </p>
                                    </div>

                                    <Link href={`/Details/${product.id}`}>
                                        <button className="mt-4 px-6 py-3 w-full bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
