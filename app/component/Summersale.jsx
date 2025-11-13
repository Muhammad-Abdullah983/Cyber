"use client";
import Image from "next/image";

export default function SummerSale() {
  return (
    <section className="relative w-full h-[440px] sm:h-[420px] bg-gradient-to-r from-[#2E2E2E] to-[#000000] text-white overflow-hidden">

      {/* ===== Desktop / Tablet Layout ===== */}
      <div className="hidden sm:block">
        {/* Left Tablet Image */}
        <div className="absolute left-6 top-1 z-10 w-[140px] sm:w-[180px] md:w-[237px]">
          <Image
            src="/images/image 18.png"
            alt="Tablet"
            width={237}
            height={195}
            className="object-contain"
          />
        </div>

        {/* Blue Tablet (below the gray one) */}
        <div className="absolute top-[173px] left-0 w-[140px] sm:w-[180px] md:w-[320px]">
          <Image
            src="/images/blueTablet.svg"
            alt="Tablet Blue"
            width={345}
            height={262}
            className="object-contain"
          />
        </div>

        {/* Top Right Phone Image */}
        <div className="absolute top-1 right-0 w-[120px] sm:w-[160px] md:w-[170px] h-[365px]">
          <Image
            src="/images/iphone-half.svg"
            alt="Phone"
            width={170}
            height={365}
            className="object-contain"
          />
        </div>

        {/* Bottom Right Watch Image */}
        <div className="absolute bottom-0 right-0 w-[140px] sm:w-[180px] md:w-[397px] h-[201px]">
          <Image
            src="/images/watch-pink.svg"
            alt="Smart Watch"
            width={397}
            height={201}
            className="object-contain"
          />
        </div>
      </div>

      {/* ===== Mobile Layout ===== */}
      <div className="block sm:hidden relative w-full h-full">
        {/* Top-left Tablet Image */}
        <div className="absolute top-0 left-0 ">
          <Image
            src="/images/mobile/tilt-screen.svg"
            alt="Tablet"
            width={100}
            height={80}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Bottom-left Mac Image */}
        <div className="absolute  top-0 left-13 ">
          <Image
            src="/images/mobile/tilt-mac.svg"
            alt="Mac"
            width={86}
            height={180}
            className="object-contain w-full h-full"
          />
        </div>


        {/* Top-right Phone Image */}
        <div className="absolute top-0 right-0 ">
          <Image
            src="/images/mobile/tilt-iphone.svg"
            alt="Phone"
            width={180}
            height={242}
            className="object-contain w-[160px] h-full "
          />
        </div>


        {/* Bottom Right Watch Image */}
        <div className="absolute bottom-0 right-0">
          <Image
            src="/images/mobile/tilt-watch.svg"
            alt="Watch"
            width={100}
            height={90}
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      {/* Center Text Content */}
      <div className="absolute inset-0 flex flex-col text-center items-center justify-center  mt-10 px-6">
        <h1 className="text-5xl sm:text-5xl md:text-7xl font-light text-white ">
          Big Summer <span className="font-medium">Sale</span>
        </h1>
        <p className="text-[#787878] mt-3 text-base font-normal sm:text-base max-w-md">
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>
        <button className="mt-7 px-14 py-4 text-white text-base sm:text-base font-medium border border-white rounded-lg hover:bg-gray-200 hover:text-black transition">
          Shop Now
        </button>
      </div>
    </section>
  );
}
