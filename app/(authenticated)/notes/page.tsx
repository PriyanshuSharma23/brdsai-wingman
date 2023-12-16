import { SearchIconInput } from "@/components/ui/icon-input";
import { FileText, MoreVertical, Search } from "lucide-react";

export default function NotesPage() {
  return (
    <div className="container space-y-2 md:space-y-4">
      <h1 className="text-lg pt-5" style={{ fontWeight: 500 }}>
        Your Notes
      </h1>
      <SearchIconInput
        icon={<Search size={16} className="stroke-gray-400" />}
      />

      <div className="space-y-6 py-6">
        {new Array(50).fill(1).map((_, i) => (
          <NoteCard
            key={i}
            providerName="D’Anna, Kathleena Marie"
            date="05/09/2023"
            type="Consult Note"
          />
        ))}
      </div>
    </div>
  );
}

type NoteCardProps = {
  providerName: string;
  date: string;
  type: string;
};

function NoteCard(props: NoteCardProps) {
  return (
    <div className="border p-4 rounded-md space-y-2 relative">
      <button className="absolute right-4 top-4">
        <MoreVertical size={18} />
      </button>
      <p className="flex text-gray-500 items-center gap-2">
        <FileText className="" size={16} />
        <span className="text-sm">{props.providerName}</span>
      </p>
      <p className="text-gray-500 text-sm">Date: {props.date}</p>

      <div className="max-w-max rounded-full bg-slate-100 border px-2 py-1 text-xs text-blu">
        {props.type}
      </div>
    </div>
  );
}
