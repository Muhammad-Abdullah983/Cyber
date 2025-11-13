'use client';
import Image from "next/image";
export default function Footer() {
    return (
        <footer className="bg-[#000000] text-white  py-20">
            <div className=" w-[80%] mx-auto ">


                <div className="container mx-auto  flex flex-col md:flex-row gap-x-20 justify-between">
                    <div className="mb-6 md:mb-0">
                        <img src="/images/footer-logo.svg"
                            alt=""
                            className="w-[65px] h-[32px] mb-4  mx-auto  md:mx-0" 
                        />
                        <p className="text-[#`CFCFCF] font-medium sm:text-sm  text-[13px] sm:text-start text-center md:w-[384px]">We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
                    </div> 
                    <div className="mb-6  sm:text-start text-center">
                        <h3 className="text-base font-semibold  sm:mb-8 mb-4">Services</h3>
                        <ul className="">
                            <li className="mb-6  sm:mb-8  text-sm font-normal text-[#CFCFCF] cursor-pointer">Bonus program</li>
                            <li className="mb-6  sm:mb-8  text-sm font-normal text-[#CFCFCF] cursor-pointer">Gift cards</li>
                            <li className="mb-6  sm:mb-8  text-sm font-normal text-[#CFCFCF] cursor-pointer">Credit and payment</li>
                            <li className="mb-6  sm:mb-8  text-sm font-normal text-[#CFCFCF] cursor-pointer">Service contracts</li>
                            <li className="mb-6  sm:mb-8  text-sm font-normal text-[#CFCFCF] cursor-pointer">Non-cash accounts</li>
                            <li className="mb-8 sm:mb-8  text-sm font-normal text-[#CFCFCF] cursor-pointer">Payment</li>
                        </ul>
                    </div>
                    <div className="mb-6 sm:mr-30 mx-auto sm:mx-0 sm:text-start text-center">
                        <h3 className="text-base font-semibold sm:mb-8 mb-6">Assistance to the buyer</h3>
                        <p className="mb-6 sm:mb-8  text-sm font-normal text-[#CFCFCF]">Find an Order</p>
                        <p className="mb-6 sm:mb-8 text-sm font-normal text-[#CFCFCF]">Terms of delivery</p>
                        <p className="mb-6 sm:mb-8 text-sm font-normal text-[#CFCFCF]">Exchange and return of goods</p>
                        <p className="mb-6 sm:mb-8 text-sm font-normal text-[#CFCFCF]">Guarantee</p>
                        <p className="mb-6 sm:mb-8 text-sm font-normal text-[#CFCFCF]">Frequently asked questions</p>
                        <p className="mb-4 sm:mb-8 text-sm font-normal text-[#CFCFCF]">Terms of use of the site</p>
                    </div>
                </div>
                {/* icons */}
                <div className="flex md:w-[173px] w-[173px] sm:mx-0 mx-auto justify-between">
                    <img src="/images/twitter.svg" alt="Twitter" className="w-6 h-6 cursor-pointer" />
                    <img src="/images/facebook.svg" alt="Facebook" className="w-6 h-6 cursor-pointer" />
                    <img src="/images/tiktok.svg" alt="Tiktok" className="w-6 h-6 cursor-pointer" />
                    <img src="/images/instagram.svg" alt="Instagram" className="w-6 h-6 cursor-pointer" />
                </div>
            </div>
        </footer >
    );
}