import { MoreVertical } from "lucide-react";
import { Note } from "./svgs/note";

type NoteCardProps = {
  name: string;
  date: string;
  format: string;
};

export const NoteCard = ({ date, name, format }: NoteCardProps) => {
  return (
    <div className="bg-white border py-6 px-4 rounded-md relative isolate -z-10">
      <div className="flex gap-2 items-center text-md text-gray-400 ">
        <Note className="w-5 stroke-gray-400 fill-gray-400" />
        <p className="max-w-[30ch]  line-clamp-1">{name}</p>
      </div>

      <p className="text-gray-400 pt-2">Date: {date}</p>

      <div className="pt-4"></div>
      <div className="px-4 text-sm py-2 border border-gray-300 bg-slate-200 text-blu max-w-max rounded-full">
        {format}
      </div>

      <button className="text-gray-400 absolute right-2 top-6">
        <MoreVertical size={19} />
      </button>
    </div>
  );
};
