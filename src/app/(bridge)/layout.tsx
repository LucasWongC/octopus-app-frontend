"use client";

import { FC, PropsWithChildren } from "react";
import Header from "@/components/layout/Header";
import Image from "next/image";
import ContextProviders from "@/contexts";

const BridgeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ContextProviders>
      <main>
        <Header />
        <div className="relative z-20 min-h-screen w-full flex items-center justify-center pt-28 pb-5">
          <div className="flex justify-center items-center w-full h-full">
            {children}
          </div>
        </div>
        <Image
          width={150}
          height={150}
          src="/proof-by-hacken-light.png"
          alt="proof by hacken"
          className="fixed bottom-10 md:right-10 md:translate-x-0 right-1/2 translate-x-1/2 block dark:hidden"
        />
        <Image
          width={150}
          height={150}
          src="/proof-by-hacken-dark.png"
          alt="proof by hacken"
          className="fixed bottom-10 md:right-10 md:translate-x-0 right-1/2 translate-x-1/2 dark:block hidden"
        />
      </main>
    </ContextProviders>
  );
};

export default BridgeLayout;
