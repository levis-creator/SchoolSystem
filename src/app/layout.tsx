import { Outfit } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import JotaiProvider from "@/jotai/JotaiProvider";
import { AppInfo } from "@/lib/AppInfo";
import { Metadata } from "next";
import { Suspense } from "react";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    template: `${AppInfo.title} | %s`,
    default: AppInfo.title
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Suspense>

      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <JotaiProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
            <Toaster position="top-center" />
          </ThemeProvider>
        </JotaiProvider>
      </body>
      </Suspense>

    </html>
  );
}
