import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="my-8">
      <div>
        <h2 className="text-[#F5F6FF] text-3xl uppercase orbitron">Metro</h2>
        <div className="sm:flex justify-between items-start text-[#C5CBFD] w-full sm:w-[80%]">
          <div className="w-full sm:w-[50%] py-10">
            <span className="grotesk block">Easy access to energy subscription over the Blockchain</span>
            <div className="sm:flex sm:space-x-4 items-center space-y-3 sm:space-y-0 mt-10">
              <div>
                <span className="grotesk md:text-xs md:flex gap-1 items-center text-center font-normal py- px-2 block text-base tracking-[0.156px] w-fit">
                  <Image src="/mdi_github.svg" alt="github" width={24} height={24} className="object-cover" />
                  Github
                </span>
              </div>

              <div>
                <span className="grotesk md:text-xs md:flex gap-1 items-center text-center font-normal py- px-2 block text-base tracking-[0.156px] w-fit">
                  <Image src="/twitter.svg" alt="twiter" width={20} height={20} className="object-cover" />
                  Twitter
                </span>
              </div>

              <div>
                <span className="grotesk md:text-xs md:flex gap-1 items-center text-center font-normal py- px-2 block text-base  tracking-[0.156px] w-fit">
                  <Image src="/ic_baseline_discord.svg" alt="discord" width={24} height={24} className="object-cover" />
                  Discord
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-12 py-10">
            <div className="block">
              <ul className="grotesk font-normal text-xs tracking-[0.12px]">
                <li className="side text-base font-bold tracking-[1.4px] mb-5">Company</li>
                <li className="pb-3">About</li>
                <li className="">Features</li>
              </ul>
            </div>
            <div className="grid">
              <ul className="grotesk font-normal text-xs tracking-[0.12px]">
                <li className="side text-base font-bold tracking-[1.4px] mb-5">Help</li>
                <li className="pb-3">Support</li>
                <li className="">Terms & Conditions</li>
              </ul>
            </div>
            <div className="grid">
              <ul className="grotesk font-normal text-xs tracking-[0.12px]">
                <li className="side text-base font-bold tracking-[1.4px] mb-5">FAQs</li>
                <li className="pb-3">Account</li>
                <li className="">Payment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-6 sm:mt-24" />
      <div className="px-6 grotesk text-xs mt-2 text-[#C5CBFD] sm:flex justify-between">
        <div className="space-x-3 block text-center sm:text-start w-full my-3">
          <span className="pb-2">Privacy Policy</span>
          <span className="pb-2">Terms of Use</span>
        </div>
        <p className=" block text-center sm:text-end w-full mt-2">
          &copy; 2023 <span className="pl-2"> All rights reserved</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
