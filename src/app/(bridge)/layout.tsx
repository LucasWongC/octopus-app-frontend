import { FC, PropsWithChildren } from "react";
import CanvasBackground from "@/components/layout/CanvasBackground";
import Header from "@/components/layout/Header";

const BridgeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Header />

      <div className="relative z-20 h-screen w-full block">
        <div className="flex justify-center items-center w-full h-full max-sm:scale-90">
          <div className="bg-darkgrey p-6 max-sm:w-full rounded-2xl">
            <header className="flex justify-between">
              {/* left side */}
              <div>
                <h1 className="text-white text-2xl font-bold">
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

      <CanvasBackground isFixed />
    </main>
  );
};

export default BridgeLayout;
