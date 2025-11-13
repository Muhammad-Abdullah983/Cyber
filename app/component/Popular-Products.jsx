import Image from "next/image";

export default function PopularProducts({ title, desc, desktopImage, mobileImage, bgColor = "bg-white" }) {
    return (
        // Let the parent wrapper (`page.jsx`) control the responsive width.
        <div className={`w-full h-full  sm:pl-6  flex flex-col border border-gray-200 ${bgColor} hover:brightness-95 transition-all`}>

            {/* Mobile Image */}
            <div className="block sm:hidden w-full pl-8 h-104 relative mb-4">
                <Image
                    src={mobileImage}
                    alt={title}
                    width={371}
                    height={390}
                    className="object-cover rounded-lg w-[371px]  h-[390px]"
                />
            </div>

            {/* Desktop Image */}
            <div className="hidden sm:block w-full h-80 relative mb-4">
                <Image
                    src={desktopImage}
                    alt={title}
                    fill
                    className="object-cover rounded-lg"
                />
            </div>

            <div className="flex flex-col text-center sm:text-left pl-4 max-w-[361px] gap-4">
                <div>
                    <h2 className={`text-[49px] sm:text-[33px] font-semibold mb-2 ${title === 'MacBook Pro' ? 'text-white' : 'text-[#000000]'}`}>{title}</h2>
                    <p className="text-[#909090] text-[14px] max-w-[320px] font-medium">{desc}</p>
                </div>
                {title === 'MacBook Pro' ? (
                    <button className="bg-transparent border border-white text-white w-[184px] text-base font-medium mx-auto sm:mx-0 px-4 py-4 sm:mb-4 rounded-lg hover:bg-white hover:text-black transition">
                        Shop Now
                    </button>
                ) : (
                    <button className="bg-transparent border text-black w-[184px] text-base font-medium mx-auto sm:mx-0 px-4 py-4 sm:mb-4 rounded-lg hover:bg-gray-800 transition">
                        Shop Now
                    </button>
                )}
            </div>
            {/* dots image container only on mobile */}
            <div className="block sm:hidden w-full">
                <Image
                    src="/images/mobile/dots.svg"
                    alt="Dots"
                    width={59}
                    height={8}
                    className="object-cover rounded-lg py-12  mx-auto "
                />
            </div>
        </div>
    );
}
