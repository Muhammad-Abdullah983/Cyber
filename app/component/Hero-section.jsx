"use client";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 gap-12 bg-[var(--darkblack)]">

            {/* Left side - text */}
            <div className="flex-1 text-center md:text-left  w-[90%] md:ml-11  mt-22 md:mt-0">
                <h1 className="font-semibold text-[20px] md:text-[25px] text-white pb-3 opacity-40">
                    Pro.Beyond.
                </h1>
                <p className="text-5xl font-thin sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-[-1px] pb-4  leading-tight">
                    IPhone 14 <span className="text-white font-semibold">Pro</span>
                </p>
                <p className="text-[19px] font-medium sm:text-lg text-white/70 md:font-light pb-5 tracking-wide">
                    Created to change everything for the better. For everyone.
                </p>
                <div>
                    <button className="px-6 py-4 rounded-md text-white w-[184px] sm:w-[184px] border-white border hover:bg-white hover:text-black transition-all duration-300">
                        Shop Now
                    </button>
                </div>
            </div>

            {/* Right side - image */}
            {/* Right side - image */}
            <div className="mr-6 flex justify-center  md:justify-end">

                {/* Mobile version */}
                <Image
                    src="/images/half-iphone.svg"
                    alt="iPhone Mobile Illustration"
                    width={343}
                    height={289}
                    className="object-contain ml-8 block h-[289px] w-[343px] sm:hidden" // visible only on mobile (<640px)
                />

                {/* Desktop version */}
                <Image
                    src="/images/Iphone Image.svg"
                    alt="iPhone 14 Pro Illustration"
                    width={400}
                    height={500}
                    className="object-contain hidden sm:block w-[321px] sm:w-[350px] md:w-[3866px] lg:w-[386px]" // visible on sm+ screens
                />
            </div>

        </section>
    );
}
