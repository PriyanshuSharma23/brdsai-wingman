import { RefObject } from "react";

interface ProgressBarRef {
  progressBarRef: RefObject<HTMLInputElement>;
  audioRef: RefObject<HTMLAudioElement>;
  timeProgress: number;
  duration: number;
  durationLoaded: boolean
}

const ProgressBar = ({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
  durationLoaded
}: ProgressBarRef) => {
  const handleProgressChange = () => {
    if (audioRef.current && progressBarRef.current)
      audioRef.current.currentTime = Number(progressBarRef.current.value);
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="progress flex flex-col w-full flex-1 justify-center translate-y-[10px] gap-1">
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
        step={0.01}
      />
      <div className="flex justify-between text-gray-400 text-sm ">
        <span className="time current">{formatTime(timeProgress)}</span>
        <span className="time current">{durationLoaded && formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
