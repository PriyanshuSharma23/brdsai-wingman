import { BottomBar } from "@/components/bottom-bar";
import { Navbar } from "@/components/nav";
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
        />

        <div className="space-y-6 py-6">
          {new Array(50).fill(1).map((_, i) => (
            <AudioCard
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
  name: string;
  duration: string;
};
function AudioCard(props: AudioCardProps) {
  return (
    <div className="space-y-2 p-3 border rounded-md">
      <p>{props.name}</p>
      <div className="flex items-center gap-1">
        <Clock className="stroke-gray-400" size={14} />
        <p className="text-sm text-gray-400">{props.duration}</p>
      </div>
    </div>
  );
}
