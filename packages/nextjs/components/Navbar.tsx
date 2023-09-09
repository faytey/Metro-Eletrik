import React, { useState } from "react";

import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/router";

const Navbar = () => {
  let navLinks = [
    { name: "Home", address: "/" },
    { name: "Docs", address: "/docs" },
    { name: "Register", address: "/register" },
  ];

  const router = useRouter();

  let [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between text-[#010101] text-base font-medium">
        <Link href="/">
          <h2 className="text-black text-3xl uppercase orbitron">METRO</h2>
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className=" text-2xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <MdOutlineClose /> : <HiMenuAlt3 />}
        </div>

        <ul
          className={`md:flex bg-white md:bg-transparent md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[100] right-4  w-[70%] md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out ${
            open ? "top-20 rounded-2xl shadow-lg" : "top-[-490px]"
          }`}
        >
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="lg:ml-[32px] md:ml-[2px] text-base md:my-0 my-7 mb-[10px]"
            >
              <Link
                href={link.address}
                onClick={() => setOpen(false)}
                className={` border border-transparent ${
                  router.pathname == link.address
                    ? "text-[#010101] border !border-[#010101] rounded-2xl px-[24px] py-[8px]"
                    : ""
                }  hover:border hover:text-[#F5F6FF] hover:bg-[#010101] rounded-2xl px-[24px] py-[8px] duration-500 ease-in-out`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <div className="md:ml-6 md:my-0 my-7 mb-[10px]">
            <Link
              href="/main"
              className=" bg-[#cdcfde] text-[#010101] rounded-2xl px-[24px] py-[8px]"
            >
              Launch App
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
