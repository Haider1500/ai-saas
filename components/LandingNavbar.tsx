"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const font = Montserrat({ weight: "300", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 flex items-center bg-transparent justify-between">
      <Link href={"/dashboard"} className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image src={"/logo.png"} fill alt="logo" />
        </div>
        <h1 className={cn("font-bold text-2xl text-white", font.className)}>
          Marvel
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button variant={"outline"} className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
