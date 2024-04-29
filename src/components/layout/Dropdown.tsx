"use client";

import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import Image from "next/image";

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
      <button
        className="bg-black rounded-full p-3"
        type="button"
        onClick={handleDropdown}
      >
        <Image
          src="/icons/menu.svg"
          alt="Discord"
          width={150}
          height={150}
          className="w-5 h-5"
        />
      </button>

      <div
        className={cn(
          "absolute top-20 right-6 sm:right-8 md:right-9 z-10 bg-darkgrey divide-y divide-gray-100 rounded-lg shadow w-44",
          { hidden: !isDropdownOpen }
        )}
      >
        <ul className="py-2 text-sm text-cream">
          <li>
            <a
              href="/octopus"
              className="block px-4 py-2 hover:bg-darkgrey-400"
            >
              White Paper
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-darkgrey-400">
              Tokenomics
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-darkgrey-400">
              Explorer
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
