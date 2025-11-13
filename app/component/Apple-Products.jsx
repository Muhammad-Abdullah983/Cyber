"use client";
import Image from "next/image";

export default function ProductsSection() {
    return (
        <section className="bg-white">

            {/* Mobile version */}
            <div className="block lg:hidden ">

                {/* AirPods Max */}
                <div className="bg-[#EDEDED] flex flex-col items-center justify-center text-center p-6">
                    <Image
                        src="/images/mobile/Airpods.svg"
                        alt="AirPods Max"
                        width={120}
                        height={200}
                        className="object-contain w-[192px] h-[200px] mb-3"
                    />
                    <p>
                        <span className="text-[34px] font-light text-black">Apple AirPods</span>
                        <span className="text-[34px] font-semibold text-black ml-1">Max</span>
                    </p>
                    <p className="text-[#909090] text-base font-medium">
                        Computational audio. It’s powerful.
                    </p>
                </div>

                {/* Vision Pro */}
                <div className="bg-[#353535] flex flex-col items-center text-center p-8">
                    <Image
                        src="/images/mobile/Apple-vision.svg"
                        alt="Apple Vision Pro"
                        width={150}
                        height={150}
                        className="object-contain w-[325px] h-[192px] mb-3"
                    />
                    <h3 className="text-[34px] font-medium text-white mb-1">
                        Apple Vision <span className="font-bold">Pro</span>
                    </h3>
                    <p className="text-[#909090] text-base font-medium max-w-[353px]">
                        A revolutionary way to experience entertainment.
                    </p>
                </div>

                {/* Playstation 5 */}
                <div className="flex flex-col items-center text-center bg-white p-6">
                    <Image
                        src="/images/mobile/PlayStation.svg"
                        alt="Playstation 5"
                        width={200}
                        height={200}
                        className="object-contain w-[200px] h-[200px] mb-3"
                    />
                    <h2 className="text-[34px] font-medium text-black mb-2">Playstation <span className="font-semibold">5</span></h2>
                    <p className="text-[#909090] text-base font-medium max-w-[350px]">
                        Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                        will redefine your PlayStation experience.
                    </p>
                </div>



                {/* Macbook Air */}
                <div className="bg-[#F5F5F7] flex flex-col items-center text-center p-6">
                    <Image
                        src="/images/mobile/Macbook-14.svg"
                        alt="Macbook Air"
                        width={330}
                        height={200}
                        className="object-contain w-[330px] h-[200px] mb-3"
                    />
                    <h2 className="text-[34px] font-semibold text-black mb-2">
                        Macbook <span className="font-thin">Air</span>
                    </h2>
                    <p className="text-[#909090] font-medium text-base mb-4 max-w-[370px]">
                        The new 15-inch MacBook Air makes room for more of what you love
                        with its spacious Liquid Retina display.
                    </p>
                    <button className="border border-black px-16 py-4 w-full rounded-md text-black text-[16px] font-medium hover:bg-black hover:text-white transition">
                        Shop Now
                    </button>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2">
                {/* LEFT SIDE */}
                <div className="grid h-[600px] grid-rows-2">
                    {/* Playstation 5 */}
                    <div className="flex sm:flex-row items-center">
                        <Image
                            src="/images/PlayStation.svg"
                            alt="Playstation 5"
                            width={360}
                            height={340}
                            className="object-contain w-[160px] sm:w-[340px] h-[200px] sm:h-[300px]"
                        />
                        <div className="text-center sm:text-left">
                            <h2 className="text-xl sm:text-[49px] font-medium text-black mb-2">
                                Playstation 5
                            </h2>
                            <p className="text-[#909090] text-sm font-medium">
                                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                                will redefine your PlayStation experience.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Row (2 small cards) */}
                    <div className="grid grid-cols-2 h-[300px]">
                        {/* AirPods Max */}
                        <div className="bg-[#EDEDED] flex flex-row items-center justify-between gap-8">
                            <Image
                                src="/images/Airpods.svg"
                                alt="AirPods Max"
                                width={100}
                                height={100}
                                className="object-contain w-[104px]"
                            />
                            <div className="text-left pr-8">
                                <p>
                                    <span className="text-[29px] font-light text-black">
                                        Apple AirPods
                                    </span>
                                    <span className="text-[29px] text-black font-semibold ml-1">
                                        Max
                                    </span>
                                </p>
                                <p className="text-sm font-medium text-[#909090]">
                                    Computational audio. It’s powerful.
                                </p>
                            </div>
                        </div>

                        {/* Vision Pro */}
                        <div className="bg-[#353535] flex flex-row items-center justify-between gap-4">
                            <Image
                                src="/images/Apple_vision.svg"
                                alt="Apple Vision Pro"
                                width={136}
                                height={190}
                                className="object-contain w-[136px] h-[190px]"
                            />
                            <div className="text-left mr-8">
                                <h3 className="text-[29px] font-medium text-white mb-1">
                                    Apple Vision <span className="font-semibold">Pro</span>
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    A revolutionary way to experience entertainment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Macbook Air */}
                <div className="bg-[#F5F5F7] flex items-center justify-between h-[600px] gap-6 overflow-hidden pl-10">
                    {/* Left content */}
                    <div className="flex flex-col justify-center flex-1">
                        <h2 className="text-[64px] font-thin text-black mb-3">
                            Macbook <span className="font-semibold">Air</span>
                        </h2>
                        <p className="text-[#909090] font-medium text-sm mb-5 max-w-[90%] lg:max-w-[280px]">
                            The new 15-inch MacBook Air makes room for more of what you love
                            with its spacious Liquid Retina display.
                        </p>
                        <button className="border border-black px-10 py-4 rounded-md text-black text-base font-medium hover:bg-black hover:text-white transition">
                            Shop Now
                        </button>
                    </div>

                    {/* Right image */}
                    <div className="flex-1 flex justify-end">
                        <Image
                            src="/images/Mackbook.svg"
                            alt="Macbook Air"
                            width={292}
                            height={500}
                            className="object-contain h-auto"
                        />
                    </div>
                </div>


            </div>
        </section>
    );
}