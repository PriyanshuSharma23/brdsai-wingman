"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { FileText, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

const PATHS = {
  "/": {
    name: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 31 31"
        fill="none"
        stroke="currentColor"
        className="flex-shrink-0"
      >
        <path
          d="M5.48828 12.6954L15.4984 3.93652L25.5086 12.6954L25.5086 25.2081H19.2523V20.203C19.2523 19.2075 18.8568 18.2527 18.1528 17.5487C17.4488 16.8447 16.494 16.4492 15.4984 16.4492C14.5029 16.4492 13.5481 16.8447 12.8441 17.5487C12.1401 18.2527 11.7446 19.2075 11.7446 20.203V25.2081H5.48829L5.48828 12.6954Z"
          strokeWidth="1.87691"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  "/notes": {
    name: "Notes",
    icon: <FileText className="flex-shrink-0 w-7 aspect-square" />,
  },
};

export const BottomBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 flex border-t justify-around w-full bg-white py-2">
      {Object.entries(PATHS).map(([key, path]) => (
        <Button
          variant={"ghost"}
          key={path.name}
          className={cn(
            "flex-col py-2 h-auto ",
            pathname == key ? "text-blu hover:text-blu" : "",
          )}
          onClick={() => router.push(key)}
        >
          {path.icon}
          {path.name}
        </Button>
      ))}
      <button className="mic-shadow -translate-y-1/2 bg-blu rounded-full w-16 h-16 aspect-square absolute hover:bg-blu hover:brightness-110 transition-all text-base grid place-content-center">
        <Mic className="stroke-white" size={36}/>
      </button>
    </div>
  );
};
