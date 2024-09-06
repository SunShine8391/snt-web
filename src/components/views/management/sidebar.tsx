"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { BsArrowLeftShort } from "react-icons/bs";
import { useSidebar } from "@/hooks/useSidebar";
import { NavItems } from "@/config/constants";
import { SideNav } from "./side-nav";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen, setIsOpen } = useSidebar();
  const [status, setStatus] = useState<boolean>(false);

  const handleToggle = () => {
    setStatus(true);
    setIsOpen((prev) => !prev);
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-20 md:block`,
        status && "duration-500",
        isOpen ? "w-72" : "w-[78px]",
        className
      )}
    >
      <BsArrowLeftShort
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          !isOpen && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4 h-full">
        <div className="px-3 py-2 h-full">
          <div className="mt-3 space-y-1 flex flex-col h-full justify-between">
            <SideNav
              className={`${
                !isOpen
                  ? "text-background opacity-0 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
                  : "opacity-100"
              } transition-all duration-300 `}
              items={NavItems}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
