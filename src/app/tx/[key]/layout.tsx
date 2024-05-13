import { FC, PropsWithChildren } from "react";
import Header from "@/components/layout/Header";
import ContextProviders from "@/contexts";

const TransactionLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ContextProviders>
      <main>
        <Header />

        <div className="relative z-20 min-h-screen w-full block pt-28 pb-5">
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
