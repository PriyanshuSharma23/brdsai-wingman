import { MoreVertical } from "lucide-react";
import { Note } from "./svgs/note";
import Link from "next/link";

type NoteCardProps = {
  name: string;
  date: string;
  format: string;
  noteId: string;
};

export const NoteCard = ({ date, name, format, noteId }: NoteCardProps) => {
  return (
    <Link href={"/notes/" + noteId}>
      <div className="bg-white border py-6 px-4 rounded-md relative isolate -z-10">
        <div className="flex gap-2 items-center text-md text-neutral-600">
          <Note className="w-5 stroke-gray-400 fill-gray-400" />
          <p className="max-w-[30ch]  line-clamp-1">{name}</p>
        </div>

        <p className="text-gray-400 pt-2">Date: {date}</p>

        <div className="pt-4"></div>
        <div className="px-4 text-sm py-2 border border-gray-300 bg-slate-200 text-blu max-w-max rounded-full">
          {format || "Custom"}
        </div>

        <button className="text-gray-400 absolute right-2 top-6">
          <MoreVertical size={19} />
        </button>
      </div>
    </Link>
  );
};
