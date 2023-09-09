import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex md:flex-row flex-col sm:py-16 py-6 sm-px-16 px- side gap-16 bg-[#F5F6FF] z-20">
      <div className=" w-4/5 flex justify-center items-start flex-col xl:px-0 sm:px-6 px-6">
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-normal sm:text-[57px] text-[44px] text-[rgb(1,1,1)] sm:leading-[100.8px] leading-[75px] side">
            A Better Game <br className="sm:block hidden" />{" "}
            <p>
              Plan <span className="text-[#1b2ab8]">For Energy</span>
            </p>{" "}
          </h1>
        </div>

        <h1 className=" font-normal sm:text-[64px] text-[44px] text-[#010101] sm:leading-[100.8px] leading-[75px] w-full side">
          with Metro.
        </h1>
        <p className="font-normal grotesk text-[#010101] text-[18px] leading-[30.8px] max-w-[889px] mt-5">
          At Metro, our greatest passions are energy and people. That is why we
          are committed to providing the energy options customers want at prices
          they deserve. And every step of the way, we are giving back to the
          communities that support us.
        </p>
        <Link
          href="/register"
          className=" text-[#cdcfde] bg-[#010101] rounded-2xl px-[24px] py-[8px] mt-10"
        >
          Register
        </Link>
      </div>

      <div className=" w-[570] md:flex items-center justify-center hidden xl:block md:my-0 my-10 relative ">
        <Image
          src="/light_hero.png"
          alt="hero-image"
          width={570}
          height={640}
          className=" object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
