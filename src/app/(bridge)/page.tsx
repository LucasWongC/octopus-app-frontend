"use client";

import dynamic from "next/dynamic";

const PageContent = dynamic(() => import("./content"), { ssr: false });

export default function Page() {
  return <PageContent />;
}
