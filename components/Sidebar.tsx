"use client";

import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    color: "text-violet-500",
  },
  {
    label: "Code",
    href: "/code",
    icon: Code,
    color: "text-pink-500",
  },
  {
    label: "Image Generation",
    href: "/image",
    icon: ImageIcon,
    color: "text-orange-500",
  },
  {
    label: "Music Generation",
    href: "/music",
    icon: Music,
    color: "text-green-500",
  },
  {
    label: "Video Generation",
    href: "/video",
    icon: VideoIcon,
    color: "text-purple-500",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    color: "text-brown-500",
  },
];

const SideBar = () => {
  const pathName = usePathname();
  return (
    <div className="flex text-white py-4 space-y-4 bg-[#111827] h-full flex-col">
      <div className="px-3 py-2 flex-1">
        <Link href={"/dashboard"} className="flex items-center mb-12">
          <div className="w-10 relative h-10 ">
            <Image fill src={"/logo.png"} alt="logo" />
          </div>
          <h1 className={cn("font-bold text-2xl", montserrat.className)}>
            Marvel
          </h1>
        </Link>
        <div className="flex flex-col">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.label}
              className={cn(
                "flex items-center p-3  w-full justify-start rounded-lg hover:text-white hover:bg-white/10 transition",
                pathName === route.href
                  ? "text-white bg-white/5"
                  : "text-zinc-400"
              )}
            >
              <div className="flex gap-2">
                <route.icon className={cn("w-5 h-5", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
