/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import Link from "next/link";

function Dropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <div
        className="p-2 rounded-full bg-[#7F64C2] text-cream cursor-pointer"
        onClick={handleDropdown}
      >
        <FaBars className="w-6 h-6" />
      </div>

      <div
        className={cn(
          "absolute top-20 right-6 sm:right-8 md:right-9 z-10 bg-darkgrey divide-y divide-gray-100 rounded-lg shadow w-44",
          { hidden: !isDropdownOpen }
        )}
      >
        <ul className="py-2 text-sm text-cream">
          <li className="flex gap-2 justify-between items-center hover:bg-darkgrey-400">
            <Link target="_blank" href="https://docs.octopusbridge.xyz/">
              <p className="block px-4 py-2">Documentation</p>
            </Link>
          </li>
          <li className="flex gap-2 justify-between items-center hover:bg-darkgrey-400">
            {/* <a href="#" className="block px-4 py-2 hover:bg-darkgrey-400">
              Tokenomics
            </a> */}
            <p className="block px-4 py-2">Explorer</p>

            <Image
              src="/icons/lockDark.svg"
              alt="lock"
              className="w-5 h-5 mx-4"
              width={50}
              height={50}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
