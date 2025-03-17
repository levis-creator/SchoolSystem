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
import React, { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [user, setUser]=useAtom(userAtom)
  useEffect(() => {
    async function pageRedirect() {
      const token = await getToken();
      if (!token) {
        redirect("/signin")
      } else {
        const result = await fetchData<AuthResponse>(`/api/${INTERNAL_ENDPOINTS.AUTH.VERIFY}`, {
          method: 'POST',
          body:token
        });
        if(result!.success && user==null){
          setUser(result)
        }
      }
    }

    pageRedirect()
  }, [user, setUser])

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
