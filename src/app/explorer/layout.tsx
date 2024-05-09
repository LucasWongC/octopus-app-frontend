import { FC, PropsWithChildren } from "react";
import Header from "@/components/layout/Header";

const ExplorerLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Header />
      <div className="relative z-20 h-screen w-full block pt-40">
        {children}
      </div>
    </main>
  );
};

export default ExplorerLayout;