import React from 'react';
import Details from '../../component/productdetails/Details';

async function getProduct(id) {
  // Debug log to see what ID is being requested
  console.log("Fetching product with ID:", id); 

  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
    if (!res.ok) {
      console.error("Fetch failed with status:", res.status);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function Page({ params }) {
  // 1. AWAIT params (Required in Next.js 15)
  const resolvedParams = await params;
  
  // 2. LOG the params to ensure the key name is correct
  console.log("Page Params:", resolvedParams);

  // 3. Extract ID (Ensure 'productdetails' matches your folder name like [productdetails])
  // If your folder is named [id], change this to: resolvedParams.id
  const productId = resolvedParams.productdetails || resolvedParams.ProductsDetails; 

  if (!productId) {
     console.error("Product ID is undefined. Check folder name vs param name.");
  }

  const product = await getProduct(productId);

  if (!product) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <h1 className="text-2xl font-bold text-black">Product not found</h1>
      </div>
      
    );
  }

  return (
    <div className="bg-white min-h-screen  w-full">
    
      <Details product={product} />
      
    </div>
  );
}