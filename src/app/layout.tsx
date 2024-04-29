import type { Metadata } from "next";
import React from "react";

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
    <html lang="tr">
      <body className="bg-cream scroll-smooth">{children}</body>
    </html>
  );
}
