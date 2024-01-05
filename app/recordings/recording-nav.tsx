"use client";

import { NavWrapper } from "@/components/nav-parent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, PencilLine, Trash2 } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { RenameDialog } from "./rename-dialog";
import { useRouter } from "next/navigation";


type RecordingNavProps = {
  name: string;
  onEdit?: (newName: string) => void;
  onDelete: () => void;
  resourceName?: "patient" | "recording" | "note";
  fallbackBackRoute?: string;
  customDialog?: ReactNode;
  onEditButtonClick?: (e: any) => void;
};

export const ActionsNav = (props: RecordingNavProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const back = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(props.fallbackBackRoute ?? "/");
    }
  };

  return (
    <>
      <NavWrapper>
        <div className="flex items-center text-primary gap-2">
          <button className="translate-y-[2px]" onClick={back}>
            <ArrowLeft size={20} className="text-gray-500" />
          </button>
          <p className="w-[20ch] md:w-max overflow-hidden text-ellipsis line-clamp-1 max-w-max">
            {props.name}
          </p>
          <button
            onClick={(e) => {
              props.onEditButtonClick?.(e)
              setOpen(true);
            }}
          >
            <PencilLine className="text-gray-500" size={20} />
          </button>
        </div>

        <Button
          className="self-center"
          variant={"ghost"}
          onClick={props.onDelete}
        >
          <Trash2 size={18} className="text-gray-500" />
        </Button>
      </NavWrapper>

      {!!props.customDialog ? (
        props.customDialog
      ) : (
        <RenameDialog
          resourceName={props.resourceName!}
          open={open}
          setOpen={setOpen}
          name={props.name}
          onEdit={props.onEdit!}
        />
      )}
    </>
  );
};
