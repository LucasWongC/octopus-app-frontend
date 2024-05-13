import { FC, PropsWithChildren } from "react";
import Header from "@/components/layout/Header";

const BridgeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Header />
      <div className="relative z-20 min-h-screen w-full flex items-center justify-center pt-28 pb-5">
        <div className="flex justify-center items-center w-full h-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default BridgeLayout;
