"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { ChevronDownIcon, HorizontaLDots } from "../../icons/index";
import SidebarWidget from "../SidebarWidget";
import { adminItems, NavItem, NavItems, navItems } from "./navitems";
import { useAtomValue } from "jotai";
import { userAtom } from "@/jotai/atoms/userAtom";
import { useSidebar } from "@/context/SidebarContext";

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const user = useAtomValue(userAtom);
  const [naItems, setNaItems] = useState<NavItems | null>(navItems);
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const handleSubmenuToggle = useCallback((index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) =>
        prev?.type === menuType && prev.index === index ? null : { type: menuType, index }
    );
  }, []);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const subMenuElement = subMenuRefs.current[key];
      if (subMenuElement) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuElement.scrollHeight,
        }));
      }
    }
  }, [openSubmenu]);

  useEffect(() => {
    setNaItems(user?.roles?.[0] === "Admin" ? adminItems : navItems);
  }, [user]);

  const renderMenuItem = useCallback(
      (nav: NavItem, menuType: "main" | "others", index: number) => {
        const isSubmenuOpen = openSubmenu?.type === menuType && openSubmenu.index === index;
        const key = `${menuType}-${index}`;

    
        return (
            <li key={nav.name}>
              {nav.subItems ? (
                  <button
                      onClick={() => handleSubmenuToggle(index, menuType)}
                      className={`menu-item group ${isSubmenuOpen ? "menu-item-active" : "menu-item-inactive"} ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
                  >
              <span className={isSubmenuOpen ? "menu-item-icon-active" : "menu-item-icon-inactive"}>
                <nav.icon />
              </span>
                    {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                    {(isExpanded || isHovered || isMobileOpen) && (
                        <ChevronDownIcon
                            className={`ml-auto w-5 h-5 transition-transform duration-200 ${isSubmenuOpen ? "rotate-180 text-brand-500" : ""}`}
                        />
                    )}
                  </button>
              ) : (
                  nav.path && (
                      <Link
                          href={nav.path}
                          className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}
                      >
                <span className={isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}>
                  <nav.icon />
                </span>
                        {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                      </Link>
                  )
              )}

              {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                  <div
                      ref={(el) => (subMenuRefs.current[key] = el)}
                      className="overflow-hidden transition-all duration-300"
                      style={{ height: isSubmenuOpen ? `${subMenuHeight[key]}px` : "0px" }}
                  >
                    <ul className="mt-2 space-y-1 ml-9">
                      {nav.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                                href={subItem.path}
                                className={`menu-dropdown-item ${isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}
                            >
                              {subItem.name}
                              <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                            <span className={`ml-auto menu-dropdown-badge ${isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"}`}>
                            new
                          </span>
                        )}
                                {subItem.pro && (
                                    <span className={`ml-auto menu-dropdown-badge ${isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"}`}>
                            pro
                          </span>
                                )}
                      </span>
                            </Link>
                          </li>
                      ))}
                    </ul>
                  </div>
              )}
            </li>
        );
      },
      [isActive, isExpanded, isHovered, isMobileOpen, openSubmenu, handleSubmenuToggle, subMenuHeight]
  );

  const renderMenuGroup = useCallback(
      (items: NavItem[], menuType: "main" | "others") => (
          <ul className="flex flex-col gap-4">
            {items.map((nav, index) => renderMenuItem(nav, menuType, index))}
          </ul>
      ),
      [renderMenuItem]
  );

  return (
      <aside
          className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"} 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
          onMouseEnter={() => !isExpanded && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
          <Link href="/">
            {isExpanded || isHovered || isMobileOpen ? (
                <>
                  <Image className="dark:hidden" src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
                  <Image className="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" width={150} height={40} />
                </>
            ) : (
                <Image src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
            )}
          </Link>
        </div>

        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
                  {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
                </h2>
                {naItems?.main && renderMenuGroup(naItems.main, "main")}
              </div>

              <div>
                <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
                  {isExpanded || isHovered || isMobileOpen ? "Others" : <HorizontaLDots />}
                </h2>
                {naItems?.others && renderMenuGroup(naItems.others, "others")}
              </div>
            </div>
          </nav>
          {(isExpanded || isHovered || isMobileOpen) && <SidebarWidget />}
        </div>
      </aside>
  );
};

export default AppSidebar;