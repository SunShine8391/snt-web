"use client";

import Link from "next/link";

// import { type NavItem } from "@/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { buttonVariants } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./subnav-accordion";

interface SideNavProps {
  // items: NavItem[];
  items: any;
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState<string>("");
  const [lastOpenItem, setLastOpenItem] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
  }, [isOpen, lastOpenItem, openItem]);

  return (
    <nav className="space-y-2">
      {items.map((item: any) =>
        item.isChidren ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "group relative flex h-12 justify-between px-4 py-2 text-sm duration-200 hover:bg-muted hover:no-underline"
                )}
              >
                <div>
                  <item.icon className={cn("h-5 w-5", item.color)} />
                </div>
                <div
                  className={cn(
                    "absolute left-12 text-sm duration-200",
                    !isOpen && className
                  )}
                >
                  {item.title}
                </div>

                {isOpen && (
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="ml-4 mt-2 space-y-2 pb-1">
                {item.children?.map((child: any) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group flex h-12 justify-start gap-x-3",
                      path === child.href && "bg-muted font-bold hover:bg-muted"
                    )}
                  >
                    {/* Use child.icon aqui em vez de item.icon */}
                    <child.icon className={cn("h-5 w-5", child.color)} />
                    <div
                      className={cn(
                        "text-sm duration-200",
                        !isOpen && className
                      )}
                    >
                      {child.title}
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group relative flex h-12 justify-start",
              path === item.href &&
                "bg-muted font-bold hover:bg-muted text-sky-600 hover:text-sky-500"
            )}
          >
            <item.icon
              className={`h-5 w-5 ${
                path === item.href
                  ? "text-sky-600 hover:text-sky-500"
                  : "text-slate-600"
              }`}
            />
            <span
              className={cn(
                "absolute left-12 text-sm duration-200",
                !isOpen && className
              )}
            >
              {item.title}
            </span>
          </Link>
        )
      )}
    </nav>
  );
}
