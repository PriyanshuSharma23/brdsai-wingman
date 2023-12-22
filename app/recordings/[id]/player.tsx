import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { useState } from "react";

export const Player = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex gap-2 flex-col fixed bottom-0 w-full">
      <div className="border-t py-2 px-4 md:hidden">
        <Button variant={"outline"} className="rounded-full w-full">
          Convert to Note
        </Button>
      </div>

      <div className="border-t py-2 px-4 flex items-center">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="text-white bg-blu rounded-full px-2 py-2 grid place-content-center flex-shrink-0 w-12 h-12"
        >
          {playing ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="translate-x-[2px]" />
          )}
        </button>
        <audio 
          src="/sample.m4a"
          controls
        />
      </div>
    </div>
  );
};
