"use client";

import Image from "next/image";
import Dropdown from "./Dropdown";
import { Char, Phrase } from "animatedtxt";
import { useEffect, useState } from "react";
import ToggleTheme from "./ToggleTheme";
import { FaTelegramPlane } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import Link from "next/link";

function Header() {
  const octopus = "OCTOPUS";
  const bridge = "BRIDGE";
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenPixelRatio, setScreenPixelRatio] = useState(0);
  const isMobile = screenWidth < 768;
  const adjustedScreenWidth = screenWidth * screenPixelRatio;
  const textMargin = isMobile
    ? 0.02 * screenWidth
    : 0.0011 * adjustedScreenWidth;
  const textFontSize = isMobile
    ? 0.11 * screenWidth
    : 0.009 * adjustedScreenWidth;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenPixelRatio(window.devicePixelRatio);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-40 w-full px-6 py-4 sm:px-8 sm:py-3">
      <div className="flex items-center justify-between h-full">
        <Link className="flex items-center gap-1" href="/">
          <div className="w-16 sm:w-20 ml-6">
            <Image
              src="/octopus.png"
              alt="SquidRouter"
              width={80}
              height={80}
            />
          </div>

          <div className="hidden md:flex gap-1">
            <Phrase
              color={"#7F64C2"}
              margin={textMargin}
              size={textFontSize}
              duration={1.1}
              delay={0}
              cubicBezier={[0.68, 0.04, 0.45, 0.98]}
            >
              {octopus.split("").map((char, index) => (
                <Char key={index} char={char} />
              ))}
            </Phrase>

            <Phrase
              color={"#E69630"}
              margin={textMargin}
              size={textFontSize}
              font="basic-medium"
              duration={1.1}
              cubicBezier={[0.68, 0.04, 0.45, 0.98]}
            >
              {bridge.split("").map((char, index) => (
                <Char key={index} char={char} />
              ))}
            </Phrase>
          </div>
        </Link>

        <div className="flex items-center gap-5">
          <div className="w-8 sm:w-10">
            <a
              href="https://twitter.com/octopusbridge_"
              target="_blank"
              rel="noreferrer"
            >
              <div className="p-2 rounded-full bg-[#7F64C2] text-cream">
                <FaTwitter className="w-6 h-6" />
              </div>
            </a>
          </div>

          {/* <div className="w-8 sm:w-10">
            <a href="https://discord.gg/" target="_blank" rel="noreferrer">
              <div className="p-2 rounded-full bg-[#7F64C2] text-cream">
                <FaDiscord className="w-6 h-6" />
              </div>
            </a>
          </div> */}

          <div className="w-8 sm:w-10">
            <a href="https://telegram.org/" target="_blank" rel="noreferrer">
              <div className="p-2 rounded-full bg-[#7F64C2] text-cream">
                <FaTelegramPlane className="w-6 h-6" />
              </div>
            </a>
          </div>

          <Dropdown />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}

export default Header;
