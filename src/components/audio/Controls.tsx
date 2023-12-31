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
  setTimeProgress: (timeProgress: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlayPause: () => void;
  disabled: boolean;
}

const Controls = ({
  audioRef,
  disabled,
  progressBarRef,
  duration,
  setTimeProgress,
  isPlaying,
  setIsPlaying,
  togglePlayPause,
}: ControlsProps) => {
  const playAnimationRef = useRef<number>();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime ?? 0;
    setTimeProgress(currentTime);

    if (progressBarRef.current) {
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(Number(progressBarRef.current.value) / duration) * 100}%`
      );
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

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
      disabled={disabled}
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
