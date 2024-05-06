import type { Metadata } from "next";
import React from "react";
import ThemeProvider from "@/contexts/ThemeContextProvider";
import { Toaster } from "react-hot-toast";

import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Octopus",
  icons: {
    icon: ["/octopus.png"],
    apple: ["/octopus.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
      <div className="text-darkgrey dark:text-cream bg-cream dark:bg-darkgrey">
        {children}
      </div>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}
