import { FC, PropsWithChildren } from "react";
import CanvasBackground from "@/components/layout/CanvasBackground";
import Header from "@/components/layout/Header";
import ContextProviders from "@/contexts";

const TransactionLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ContextProviders>
      <main>
        <Header />

        <div className="relative z-20 h-screen w-full block">
          <div className="flex justify-center items-center w-full h-full max-sm:scale-90">
            {children}
          </div>
        </div>

        {/* <CanvasBackground isFixed /> */}
      </main>
    </ContextProviders>
  );
};

export default TransactionLayout;
