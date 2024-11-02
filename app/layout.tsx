"use client";
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import "react-toastify/dist/ReactToastify.css";
import InfintyProvider from "@/components/providers/InfintyProvider";
import useStore from "@/hooks/zustand";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getLang } = useStore();
  return (
    <InfintyProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-black via-white to-black bg-fixed`}
        dir={getLang()==="ar"?"rtl":"ltr"}
        >
        <ThemeProvider theme={baselightTheme}>
        <CssBaseline />
        {children}
        <ToastContainer/>
        </ThemeProvider>
      </body>
    </html>
        </InfintyProvider>
  );
}
