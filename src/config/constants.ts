import { Clock3, Calendar, List } from "lucide-react";
// import { type NavItem } from "@/types";

// import { Person } from "@/types";

export const people: any = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

export const NavItems: any = [
  {
    title: "Management",
    icon: Clock3,
    href: "/management",
    color: "text-slate-400",
  },
  {
    title: "Nach Tagen",
    icon: Calendar,
    href: "/not-found",
    color: "text-slate-400",
  },
  {
    title: "Nach Aufgaben",
    icon: List,
    href: "/not-found",
    color: "text-slate-400",
  },
];

export const KitLists: any = [
  { value: "100,989", label: "Kits Ordered", bgColor: 'bg-slate-100' },
  { value: "4,612", label: "Kits In Transit", bgColor: "bg-orange-100" },
  { value: "7,954", label: "Awaiting Collection", bgColor: "bg-yellow-100" },
  { value: "2,145", label: "Samples In Transit", bgColor: "bg-gray-300" },
  { value: "84,567", label: "Samples Resulted", bgColor: "bg-green-100" },
  { value: "1,711", label: "Samples Rejected", bgColor: "bg-pink-100" },
];
