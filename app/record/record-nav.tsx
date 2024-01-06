"use client";

import { NavWrapper } from "@/components/nav-parent";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type RecordNavProps = {};
export const RecordNav = (props: RecordNavProps) => {
  const router = useRouter();

  const back = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/recordings");
    }
  };

  return (
    <NavWrapper>
      <div className="flex items-center text-primary gap-2 py-2">
        <button className="translate-y-[2px]" onClick={back}>
          <ArrowLeft size={20} className="text-gray-500" />
        </button>
        <p className="w-[20ch] overflow-hidden text-ellipsis line-clamp-1 max-w-max">
          New Recording
        </p>
      </div>
    </NavWrapper>
  );
};
