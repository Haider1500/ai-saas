"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    color: "bg-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    href: "/music",
    icon: Music,
    color: "bg-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    href: "/image",
    icon: ImageIcon,
    color: "bg-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Video Generation",
    href: "/video",
    icon: VideoIcon,
    color: "bg-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    label: "Code Generation",
    href: "/code",
    icon: Code,
    color: "bg-pink-500",
    bgColor: "bg-pink-500/10",
  },
];

export default function dashboardPage() {
  const router = useRouter();
  return (
    <div className="">
      <div className="mb-8 space-y-4">
        <h2 className="font-bold text-2xl md:text-4xl text-center">
          Explore the power of AI
        </h2>
        <p className="font-light text-muted-foreground text-sm md:text-lg text-center">
          Converse, generate Images and many more on one Platform!
        </p>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool) => (
            <Card
              onClick={() => router.push(tool.href)}
              className="flex border-black/5 items-center justify-between hover:shadow-md transition p-4 cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md ", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
