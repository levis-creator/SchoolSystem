"use client";

import { Menu, X, Search, MoreVertical } from "lucide-react";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    window.innerWidth >= 991 ? toggleSidebar() : toggleMobileSidebar();
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
      <header className="sticky top-0 z-99 w-full border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:border-b">
        <div className="flex flex-col justify-between lg:flex-row lg:px-6">
          <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
            {/* Sidebar Toggle */}
            <button
                className="lg:flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-lg text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 lg:border z-99999"
                onClick={handleToggle}
                aria-label="Toggle Sidebar"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="lg:hidden">
              <Image
                  width={154}
                  height={32}
                  src="/images/logo/logo.svg"
                  alt="Logo"
                  className="dark:hidden"
              />
              <Image
                  width={154}
                  height={32}
                  src="/images/logo/logo-dark.svg"
                  alt="Logo"
                  className="hidden dark:block"
              />
            </Link>

            {/* Application Menu Toggle (mobile only) */}
            <button
                onClick={toggleApplicationMenu}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 z-99999"
            >
              <MoreVertical size={24} />
            </button>

            {/* Search Box (Desktop Only) */}
            <div className="hidden lg:block">
              <form>
                <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search size={20} className="text-gray-500 dark:text-gray-400" />
                </span>
                  <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search or type command..."
                      className="xl:w-[430px] h-11 w-full rounded-lg border border-gray-200 bg-transparent pl-12 pr-14 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 shadow-theme-xs focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                  <button className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                    <span>⌘</span>
                    <span>K</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Application Menu Items (Desktop and Mobile) */}
          <div
              className={`${
                  isApplicationMenuOpen ? "flex" : "hidden"
              } lg:flex items-center justify-between w-full gap-4 px-5 py-4 lg:justify-end lg:px-0 lg:shadow-none shadow-theme-md`}
          >
            <div className="flex items-center gap-2 2xsm:gap-3">
              <ThemeToggleButton />
              <NotificationDropdown />
            </div>
            <UserDropdown />
          </div>
        </div>
      </header>
  );
};

export default AppHeader;
