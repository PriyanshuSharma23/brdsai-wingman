import { Button } from "@/components/ui/button";
import { parseTimestamp } from "@/lib/utils";

type RecordingControlsProps = {
  isPaused: boolean;
  isRecording: boolean;
  recordingTime: number;
  toggleRecording: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  saveRecording: () => void;
};
export const RecordingControls = (props: RecordingControlsProps) => {
  const handleClick = () => {
    props.toggleRecording();
  };
  const handleDelete = () => { // For some reason the microphone access does not stop without pausing first
    if (!props.isPaused) {
      props.toggleRecording();
    }
    setTimeout(() => { // stop recording at the end of the cycle after the toggling is done
      props.stopRecording();
    });
  };
  return (
    <div className="  py-6 pt-12 ">
      <div className="flex items-center justify-center md:justify-center gap-8 ">
        {props.isRecording && (
          <Button
            variant={"ghost"}
            className="text-red-400 hover:text-red-400 text-lg w-28"
            size="lg"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
        {props.isRecording ? (
          <Button
            className="mic-shadow shadow-2xl shadow-blu text-xl rounded-xl py-8 px-6 w-32"
            onClick={handleClick}
            key={"play-pause"}
          >
            {!props.isPaused
              ? // <Pause className="flex-shrink-0" size={28} />
                "Pause"
              : // <Mic className="flex-shrink-0" size={28} />
                "Resume"}
          </Button>
        ) : (
          <Button
            className="mic-shadow shadow-2xl shadow-blu text-xl rounded-xl py-8 px-6 w-32"
            onClick={() => {
              console.log("starting to record");
              props.startRecording();
            }}
            key={"record"}
          >
            Record
          </Button>
        )}
        {props.isRecording && (
          <Button
            variant={"ghost"}
            className="text-blu hover:text-blu text-lg w-28"
            size={"lg"}
            onClick={props.saveRecording}
          >
            Save
          </Button>
        )}
      </div>
      <p className="text-center text-gray-600/60 mt-3  mx-auto min-h-[1.5rem]">
        {props.isRecording ? parseTimestamp(props.recordingTime, 2) : " "}
      </p>
    </div>
  );
};
