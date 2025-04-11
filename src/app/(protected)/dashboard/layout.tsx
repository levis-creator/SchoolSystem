"use client";
import { useSidebar } from "@/context/SidebarContext";
import { userAtom } from "@/jotai/atoms/userAtom";
import AppHeader from "@/layout/AppHeader";
import Backdrop from "@/layout/Backdrop";
import AppSidebar from "@/layout/navigation/AppSidebar";
import { INTERNAL_ENDPOINTS } from "@/lib/ApiUrl";
import { fetchData } from "@/lib/fetch";
import { getToken } from "@/lib/token";
import { AuthResponse } from "@/lib/types";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function ProtectedLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyTokenAndRedirect() {
      const token = await getToken();
      if (!token) {
        redirect("/signin");
      } else {
        try {
          const result = await fetchData<AuthResponse>(
              `/api/${INTERNAL_ENDPOINTS.AUTH.VERIFY}`,
              {
                method: "POST",
                body: token,
              }
          );
          if (result?.success && user == null) {
            setUser(result);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          redirect("/signin");
        } finally {
          setLoading(false);
        }
      }
    }

    verifyTokenAndRedirect();
  }, [user, setUser]);

  // Calculate main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
      ? "ml-0"
      : isExpanded || isHovered
          ? "lg:ml-[290px]"
          : "lg:ml-[90px]";

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <ClipLoader color="#3B82F6" size={50} />
        </div>
    );
  }

  return (
      <div className="min-h-screen flex flex-col max-w-screen overflow-hidden bg-white dark:bg-gray-900">
        {/* Header (fixed height) */}
        <AppHeader />

        {/* Main content area (flex-1 takes remaining space) */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          <AppSidebar />
          <Backdrop />

          {/* Main content container */}
          <main
              className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} overflow-y-auto`}
              style={{
                // Calculate height accounting for header (4rem = 64px)
                height: 'calc(100vh - 4rem)',
                // Ensure content doesn't shift when scrollbar appears
                scrollbarGutter: 'stable'
              }}
          >
            {/* Content container with proper padding and max-width */}
            <div className="p-4 mx-auto max-w-[--breakpoint-2xl] md:p-6 h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
  );
}