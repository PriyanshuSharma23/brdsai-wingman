import Link from "next/link";
import { SearchIconInput } from "@/components/ui/icon-input";
import { Clock, Search } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="container space-y-2 md:space-y-4">
        <h1 className="text-lg pt-5" style={{ fontWeight: 500 }}>
          Your Recordings
        </h1>
        <SearchIconInput
          icon={<Search size={16} className="stroke-gray-400" />}
          placeholder={"Search"}
        />

        <div className="space-y-4 py-6">
          {new Array(50).fill(1).map((_, i) => (
            <AudioCard
              id={`${i}`}
              name={"Recording " + `${i + 1}`}
              duration={"10:30"}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}

type AudioCardProps = {
  id: string;
  name: string;
  duration: string;
};
function AudioCard(props: AudioCardProps) {
  return (
    <Link href={"/recordings/" + props.id} className="block">
      <div className="space-y-2 p-3 border rounded-md">
        <p>{props.name}</p>
        <div className="flex items-center gap-1">
          <Clock className="stroke-gray-400" size={14} />
          <p className="text-sm text-gray-400">{props.duration}</p>
        </div>
      </div>
    </Link>
  );
}
