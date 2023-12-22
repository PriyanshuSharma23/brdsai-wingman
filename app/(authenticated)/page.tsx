import Link from "next/link";
import { SearchIconInput } from "@/components/ui/icon-input";
import { Clock, Mic, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="px-4 md:px-12 xl:px-20 space-y-2 md:space-y-4 text-neutral-600 pt-6">
        <h1 className="text-lg pt-5" style={{ fontWeight: 500 }}>
          Your Recordings
        </h1>
        <div className="flex max-w-md items-center gap-2">
          <div className="flex-1">
            <SearchIconInput
              icon={<Search size={16} className="stroke-gray-400" />}
              className="w-full flex-1"
            />
          </div>
          <Button className="w-11 ">
            <SlidersHorizontal className="flex-shrink-0" size={19} />
          </Button>
        </div>

        <div className="space-y-4 py-2">
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
        <div className="flex gap-1 items-center text-blu ">
          <Mic size={18}/>
          <p>{props.name}</p>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="stroke-gray-400" size={14} />
          <p className="text-sm text-gray-400">{props.duration}</p>
        </div>
      </div>
    </Link>
  );
}
