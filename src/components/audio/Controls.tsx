import { Pause, Play } from "lucide-react";
import {
  useEffect,
  useRef,
  useCallback,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";

interface ControlsProps {
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
  duration: number;
  setTimeProgress: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  durationLoaded: boolean;
}

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  isPlaying,
  setIsPlaying,
  durationLoaded,
}: ControlsProps) => {
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAnimationRef = useRef<number>();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime ?? 0;
    setTimeProgress(currentTime);

    if (progressBarRef.current) {
      if (durationLoaded) {
        progressBarRef.current.value = currentTime.toString();
      } else {
        let s = Number(progressBarRef.current.max);
        progressBarRef.current.value = (s - 1).toString();
      }
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${
          (Number(progressBarRef.current.value) /
            (durationLoaded
              ? duration
              : Number(progressBarRef.current.value) + 1)) *
          100
        }%`,
      );
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress, durationLoaded]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  return (
    <button
      onClick={() => togglePlayPause()}
      className="text-white bg-blu rounded-full px-2 py-2 grid place-content-center flex-shrink-0 w-10 h-10"
    >
      {isPlaying ? (
        <Pause size={20} />
      ) : (
        <Play size={20} className="translate-x-[2px]" />
      )}
    </button>
  );
};

export default Controls;
