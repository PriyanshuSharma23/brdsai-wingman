"use client";

import { NavWrapper } from "@/components/nav-parent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, PencilLine, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RenameDialog } from "./rename-dialog";

type RecordingNavProps = {
  id: string;
  name: string;
  onEdit: (newName: string) => void;
  onDelete: () => void;
};

export const RecordingNav = (props: RecordingNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavWrapper>
        <div className="flex items-center text-primary gap-2">
          <Link href={"/"}>
            <button className="translate-y-[2px]">
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
          </Link>
          <p className="w-[20ch] overflow-hidden text-ellipsis line-clamp-1 max-w-max">
            {props.name}
          </p>
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            <PencilLine className="text-gray-500" size={20} />
          </button>
        </div>

        <Button className="self-center" variant={"ghost"}>
          <Trash2 size={18} className="text-gray-500" />
        </Button>
      </NavWrapper>
      <RenameDialog
        open={open}
        setOpen={setOpen}
        name={props.name}
        onEdit={props.onEdit}
      />
    </>
  );
};
