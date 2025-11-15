"use client";
import React, { useState, useEffect } from 'react';
import { IoChevronForward, IoHeartOutline, IoHeart, IoCheckmarkCircle } from "react-icons/io5";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../CartDetails/cart';

const Details = ({ product }) => {
  // === 1. SAFETY GUARD ===
  if (!product || !product.images) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // === 2. STATE ===
  const [mainImage, setMainImage] = useState(product.images[0] || product.thumbnail);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [wishlist, setWishlist] = useState({}); // Manage wishlist for related items
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Calculate fake original price
  const originalPrice = Math.round(product.price * 1.2);

  // === 3. FETCH RELATED PRODUCTS EFFECT ===
  useEffect(() => {
    async function fetchRelated() {
      if (!product.category) return;
      try {
        // Fetch a few more to ensure we have enough after filtering
        const res = await fetch(`https://dummyjson.com/products/category/${product.category}?limit=8`);
        const data = await res.json();

        // Filter out the CURRENT product so it doesn't show in related, and take top 4
        const filtered = data.products
          .filter(p => p.id !== product.id)
          .slice(0, 4);

        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error loading related products", error);
      }
    }
    fetchRelated();
  }, [product.category, product.id]);

  // Wishlist toggle helper
  const toggleWishlist = (id) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // get addToCart function from context
  const { addToCart } = useCart();
  const router = useRouter();
  const handleAddToCart = () => {
    // 1. Define cartProduct (This part was missing)
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || product.images[0] || "",
    };

    // 2. Add the product to the cart
    addToCart(cartProduct);

    // 3. Show the confirmation pop-up
    setShowConfirmation(true);

    // 4. Hide the pop-up after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    // Outer-most container
    <div className="w-full pb-20">

      {showConfirmation && (
        <div
          className="fixed top-14 right-10 z-50 
               flex items-center gap-4 
               bg-green-600 text-white 
               px-6 py-4 rounded-lg shadow-lg
               animate-bounce"
        >
          <IoCheckmarkCircle className="text-3xl" />
          <span className="font-semibold">Item added to cart!</span>
        </div>
      )}

      {/* SECTION 1: TOP PRODUCT CARD (YOUR CODE)    */}
      {/* ========================================== */}
      <div className="max-w-[80%] mx-auto px-4 md:px-0">

        {/* BREADCRUMB NAVIGATION */}
        <nav className="flex items-center gap-3 text-[#A4A4A4] text-base py-8 sm:gap-6 mb-4 sm:mb-20 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <IoChevronForward className="text-base" />

          <span className="hover:text-black transition cursor-pointer">Catalog</span>
          <IoChevronForward className="text-base" />

          <Link href={`/Products/${product.category}`} className="capitalize hover:text-black transition">
            {product.category}
          </Link>
          <IoChevronForward className="text-base" />

          <span className="capitalize text-[#A4A4A4]">{product.brand}</span>
          <IoChevronForward className="text-base" />

          <span className="text-black font-medium truncate max-w-[150px]">
            {product.title}
          </span>
        </nav>

        {/* MAIN PRODUCT INFO & IMAGE */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">

          {/* --- LEFT COLUMN: IMAGES --- */}
          <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails List */}
            <div className="flex md:flex-col gap-4 pt-28 overflow-x-auto md:overflow-visible justify-center md:justify-start">
              {product.images.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 md:w-20 md:h-20  flex-shrink-0 cursor-pointer overflow-hidden transition-all ${mainImage === img ? 'border-black border opacity-100' : 'border-gray-200 opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-contain bg-white p-1" />
                </div>
              ))}
            </div>
            {/* Main Image Area */}
            <div className="flex-1 flex items-center justify-center pb-40 min-h-[350px] md:min-h-[500px] p-8">
              <img src={mainImage} alt={product.title} className="max-h-[400px] w-full object-contain drop-shadow-xl" />
            </div>
          </div>

          {/* --- RIGHT COLUMN: SUMMARY INFO --- */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">

            <h1 className="text-4xl font-bold text-gray-900 tracking-wide">{product.title}</h1>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-medium text-black">${product.price}</span>
              <span className="text-xl text-gray-400 line-through font-light">${originalPrice}</span>
            </div>

            {/* Colors */}
            <div className="mt-2 flex gap-4">
              <p className="text-sm text-gray-500 mb-1 pt-2 font-medium">Select color :</p>
              <div className="flex gap-3">
                {['black', '#781DBC', '#E10024', '#E1B100', '#E8E8E8'].map((color, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full cursor-pointer border border-gray-300 hover:scale-110 transition shadow-sm ring-2 ring-offset-2 ring-transparent hover:ring-gray-200"
                  ></div>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div className="mt-2">

              <div className="flex flex-wrap gap-4">
                {['128GB', '256GB', '512GB', '1TB'].map((storage, i) => (
                  <button
                    key={i}
                    className={`px-8 py-3 rounded-lg border text-sm font-medium transition ${i === 2 ? 'border-black text-black bg-white shadow-sm' : 'border-gray-300 text-gray-500 hover:border-gray-400'}`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-4 mt-2">
              <SpecCard icon="🏷️" label="Brand" value={product.brand || "Generic"} />
              <SpecCard icon="⚖️" label="Weight" value={product.weight ? `${product.weight}g` : "N/A"} />
              <SpecCard icon="📏" label="Width" value={product.dimensions?.width ? `${product.dimensions.width}cm` : "N/A"} />
              <SpecCard icon="📐" label="Height" value={product.dimensions?.height ? `${product.dimensions.height}cm` : "N/A"} />
              <SpecCard icon="🛡️" label="Warranty" value={product.warrantyInformation || "No Info"} />
              <SpecCard icon="📦" label="Returns" value={product.returnPolicy || "30 Days"} />
            </div>

            {/* Description snippet */}
            <p className="text-sm text-gray-500 leading-relaxed mt-2 line-clamp-3">
              {product.description}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-2">
              <button className="flex-1 py-4 rounded-lg border border-black font-semibold text-black hover:bg-gray-400 cursor-pointer transition">
                Add to Wishlist
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition cursor-pointer shadow-lg"
              >
                Add to Cart
              </button>

            </div>

            {/* Delivery Icons */}
            <div className="flex justify-between mt-3 text-xs text-gray-500">
              <InfoItem icon="🚚" title="Free Delivery" sub="1-2 day" />
              <InfoItem icon="🏠" title="In Stock" sub="Today" />
              <InfoItem icon="🛡️" title="Guaranteed" sub="1 year" />
            </div>

          </div> {/* END RIGHT COLUMN */}
        </div> {/* END MAIN PRODUCT INFO & IMAGE */}

      </div> {/* END SECTION 1 */}


      {/* ========================================== */}
      {/* SECTION 2: BOTTOM DETAILS BOX (Full Width) */}
      {/* ========================================== */}
      <div className="w-full bg-[#FAFAFA] py-16 mt-10">
        <div className="max-w-[80%] bg-white mx-auto px-4 py-8 md:px-8">

          <h3 className="text-3xl font-bold mb-10 text-gray-900">Details</h3>

          <p className="text-base text-[#6F6F6F] leading-7 mb-12 max-w-4xl">
            {product.description}. Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays.
          </p>

          {/* --- Sub-Section: Physical Specs --- */}
          <div className="mb-10">
            <h4 className="text-xl font-bold mb-6 text-black">Physical Specifications</h4>
            <div className="flex flex-col gap-4">
              <Row label="Brand" value={product.brand || "Generic"} />
              <Row label="Weight" value={product.weight ? `${product.weight}g` : "N/A"} />
              <Row label="Width" value={product.dimensions?.width ? `${product.dimensions.width} cm` : "N/A"} />
              <Row label="Height" value={product.dimensions?.height ? `${product.dimensions.height} cm` : "N/A"} />
              <Row label="Depth" value={product.dimensions?.depth ? `${product.dimensions.depth} cm` : "N/A"} />
            </div>
          </div>

          {/* --- Sub-Section: Purchase Info --- */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-6 text-black">Purchase Information</h4>
            <div className="flex flex-col gap-4">
              <Row label="Warranty" value={product.warrantyInformation || "Standard"} />
              <Row label="Shipping" value={product.shippingInformation || "Express"} />
              <Row label="Return Policy" value={product.returnPolicy || "30 Days"} />
              <Row label="Availability" value={product.availabilityStatus || "In Stock"} />
            </div>
          </div>

          {/* View More Button */}
          <div className="flex justify-center mt-10">
            <button className="flex items-center gap-3 border border-gray-300 px-8 py-3 rounded-lg text-sm font-medium bg-white hover:border-black transition-colors text-gray-700">
              View More
              <IoChevronForward className="rotate-90 text-gray-500" />
            </button>
          </div>

        </div>
      </div> {/* END SECTION 2 */}

      {/* ========================================== */}
      {/* SECTION 3: FULL REVIEWS SECTION            */}
      {/* ========================================== */}
      <div className="max-w-[80%] mx-auto px-4 md:px-0 mt-16 mb-20">

        <h3 className="text-2xl font-bold mb-8 text-gray-900">Reviews</h3>

        {/* --- REVIEW SUMMARY & DISTRIBUTION GRID --- */}
        <div className="grid grid-cols-[150px_1fr] bg-white mb-10">

          {/* LEFT: Overall Rating */}
          <div className="flex flex-col items-center justify-center w-full bg-[#F9F9F9] rounded-xl text-center p-4">
            <p className="text-[56px] font-extrabold text-black mb-2">
              {product.reviews && product.reviews.length > 0
                ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
                : "0.0"
              }
            </p>
            <p className="text-gray-500 mb-3">
              of {product.reviews?.length || 0} reviews
            </p>
            <div className="flex text-yellow-400 text-2xl">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={
                  product.reviews && product.reviews.length > 0 && i < (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length)
                    ? "text-yellow-400" : "text-gray-300"
                }>★</span>
              ))}
            </div>
          </div>

          {/* RIGHT: Rating Distribution Bars */}
          <div className="flex flex-col gap-4 p-4 w-full">
            {[
              { label: "Excellent", rating: 5 },
              { label: "Good", rating: 4 },
              { label: "Average", rating: 3 },
              { label: "Below Average", rating: 2 },
              { label: "Poor", rating: 1 },
            ].map((category, i) => {
              const count = product.reviews
                ? product.reviews.filter(r => r.rating === category.rating).length
                : 0;
              const totalReviews = product.reviews?.length || 1;
              const percentage = (count / totalReviews) * 100;

              return (
                <div key={i} className="flex items-center gap-4 w-full">
                  <span className="text-sm text-gray-700 w-20 flex-shrink-0">{category.label}</span>
                  <div className="relative flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-orange-400 h-full rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-700 w-6 text-right flex-shrink-0">{count}</span>
                </div>
              );
            })}
          </div>
        </div>


        {/* --- LEAVE COMMENT INPUT --- */}
        <h4 className="sr-only">Leave a Comment</h4>
        <textarea
          className="w-full h-12 p-4 border border-gray-300 rounded-lg text-sm text-gray-800 "
          placeholder="Leave Comment"
        ></textarea>


        {/* --- INDIVIDUAL REVIEWS LIST --- */}
        <div className="grid mt-3  gap-6">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="bg-[#F4F4F4] p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">

                {/* Review Header: Avatar, Name, Stars, Date */}
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    {/* Avatar Placeholder */}
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
                      {review.reviewerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-black text-sm">{review.reviewerName}</p>
                      {/* Star Rating */}
                      <div className="flex text-yellow-400 text-xs mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review Date */}
                  <p className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.comment}
                </p>

              </div>
            ))
          ) : (
            <p className="text-gray-500 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              No reviews yet. Be the first to leave one!
            </p>
          )}
        </div>


        {/* --- VIEW MORE REVIEWS BUTTON --- */}
        <div className="flex justify-center mt-12">
          <button className="flex items-center gap-3 border border-gray-800 px-8 py-3 rounded-lg text-sm font-medium bg-white hover:border-black transition-colors text-gray-700 shadow-sm">
            View More
            <IoChevronForward className="rotate-90 text-gray-800" />
          </button>
        </div>

      </div>{/* END SECTION 3 */}

      {/* ========================================== */}
      {/* SECTION 4: RELATED PRODUCTS (NEW)          */}
      {/* ========================================== */}
      <div className="max-w-[80%] mx-auto px-4 md:px-0 mt-20 mb-10">
        <h3 className="text-2xl font-bold mb-8 text-gray-900">Related Products</h3>

        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div
                key={relatedProduct.id}
                className="bg-[#F6F6F6] rounded-[9px] p-6 flex flex-col items-center relative group transition hover:shadow-lg"
              >
                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleWishlist(relatedProduct.id)}
                  className="absolute top-4 right-4 z-10 text-2xl text-gray-400 hover:text-red-500 transition-colors"
                >
                  {wishlist[relatedProduct.id] ? (
                    <IoHeart className="text-red-500" />
                  ) : (
                    <IoHeartOutline />
                  )}
                </button>

                {/* Product Image - Link to Details */}
                <Link href={`/Details/${relatedProduct.id}`} className="w-full flex justify-center mb-4">
                  <img
                    src={relatedProduct.thumbnail}
                    alt={relatedProduct.title}
                    className="h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Title */}
                <h4 className="text-center font-medium text-black text-base line-clamp-2 mb-2 h-12">
                  {relatedProduct.title}
                </h4>

                {/* Price */}
                <p className="text-xl font-bold text-black mb-4">
                  ${relatedProduct.price}
                </p>

                {/* Buy Now Button */}
                <Link href={`/Details/${relatedProduct.id}`}>
                  <button className="bg-black text-white px-10 py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors">
                    Buy Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No related products found.</p>
        )}
      </div> {/* END SECTION 4 */}

    </div> // END Outer-most container
  );
};

// --- Helper Components ---

const SpecCard = ({ icon, label, value }) => (
  <div className="bg-[#F4F4F4] p-3 rounded-lg flex flex-col justify-center items-center text-center gap-1 min-h-[80px]">
    <span className="text-xl opacity-60">{icon}</span>
    <span className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</span>
    <span className="text-xs font-bold text-gray-700 line-clamp-1">{value}</span>
  </div>
);

const InfoItem = ({ icon, title, sub }) => (
  <div className="flex gap-4 items-center">
    <div className="bg-[#F4F4F4] w-12 h-12 flex items-center justify-center rounded-xl text-xl text-gray-600">{icon}</div>
    <div>
      <p className="font-bold text-gray-400 text-xs mb-0.5">{title}</p>
      <p className="text-black font-semibold text-xs">{sub}</p>
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between border-b border-[#EBEBEB] pb-3 text-[15px]">
    <span className="text-black font-normal">{label}</span>
    <span className="text-black font-medium text-right">{value}</span>
  </div>
);

export default Details;