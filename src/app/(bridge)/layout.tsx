import { FC, PropsWithChildren } from "react";
import CanvasBackground from "@/components/layout/CanvasBackground";
import Header from "@/components/layout/Header";

const BridgeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Header />

      <div className="relative z-20 h-screen w-full block">
        <div className="flex justify-center items-center w-full h-full max-sm:scale-90">
          <div className="bg-darkgrey dark:bg-cream p-6 max-sm:w-full rounded-2xl w-full max-w-xl">
            <header className="flex justify-between">
              {/* left side */}
              <div>
                <h1 className="text-white dark:text-darkgrey text-2xl font-bold">
                  Bitcoin Bridge
                </h1>
              </div>

              {/* right side */}
              <div></div>
            </header>
            {children}
            <footer></footer>
          </div>
        </div>
      </div>

      {/* <CanvasBackground isFixed /> */}
    </main>
  );
};

export default BridgeLayout;
