"use client";

import { useParams, useRouter } from "next/navigation";
import { IoChevronForward } from "react-icons/io5"; // Import the icon

const Breadcrumb = () => {
    const router = useRouter();
    const params = useParams();
    const category = params.category;

    const handlehomeclick = () => {
        router.push("/");
    }
    const handlecatalogclick = () => {
        router.push("/products");
    }

    return (
        <div className='hidden sm:flex items-center gap-4 sm:pt-10 sm:pr-40 sm:pb-10 sm:pl-33'>
            <span
                onClick={handlehomeclick}
                className="text-[16px] leading-4 font-medium tracking-normal text-[#A4A4A4] cursor-pointer hover:text-black"
            >
                Home
            </span>
            
            <IoChevronForward className="text-[#A4A4A4] text-sm" />

            <span
                onClick={handlecatalogclick}
                className="text-[16px] leading-4 font-medium tracking-normal text-[#A4A4A4] cursor-pointer hover:text-black"
            >
                Catalog
            </span>
            <IoChevronForward className="text-[#A4A4A4] text-sm" />

            <span
                className="text-[16px] leading-4 font-medium tracking-normal text-black capitalize"
            >
                {category}
            </span>
        </div>
    )
}

export default Breadcrumb;