"use client";

import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<div className="">
<Header/>
<div className="lg:p-9 p-3">

        {children}
</div>
</div>



  );
}
