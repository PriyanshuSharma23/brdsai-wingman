import { Button } from "@/components/ui/button";
import { Mic, Pause } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type RecordingControlsProps = {
  isRecording: boolean;
  toggleRecording: () => void;
  startRecording: () => void;
  stopRecording: () => void;
};
export const RecordingControls = (props: RecordingControlsProps) => {
  const handleClick = () => {
    if (props.isRecording) {
      props.stopRecording();
    } else {
      props.startRecording();
    }
  }
  return (
    <div className="bg-white py-6 border-t">
      <div className="flex items-center justify-between md:justify-center gap-8 ">
        <Button
          variant={"ghost"}
          className="text-red-400 hover:text-red-400 text-lg w-28"
          size="lg"
        >
          Delete
        </Button>
        <Button
          className="mic-shadow shadow-2xl shadow-blu text-xl rounded-xl py-8 px-6"
          onClick={handleClick}
        >
          {props.isRecording ? (
            // <Pause className="flex-shrink-0" size={28} />
            "Pause"
          ) : (
            // <Mic className="flex-shrink-0" size={28} />
            "Resume"
          )}
        </Button>
        <Button
          variant={"ghost"}
          className="text-blu hover:text-blu text-lg w-28"
          size={"lg"}
        >
          Save
        </Button>
      </div>
      <p className="text-center text-gray-600/60 mt-3  mx-auto ">00:23</p>
    </div>
  );
};
