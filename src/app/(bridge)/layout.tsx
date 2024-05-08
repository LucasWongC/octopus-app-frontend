import { FC, PropsWithChildren } from "react";
import Header from "@/components/layout/Header";

const BridgeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Header />
      <div className="relative z-20 h-screen w-full block">
        <div className="flex justify-center items-center w-full h-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default BridgeLayout;
