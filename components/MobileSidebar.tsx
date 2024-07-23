"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBar from "./Sidebar";
import { useEffect, useState } from "react";

interface MobileSideBarPros {
  apiLimitCount: number;
  isPro: boolean;
}

const MobileSideBar = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSideBarPros) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(!isMounted);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <SideBar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
