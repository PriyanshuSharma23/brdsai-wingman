import { useEffect, useRef, useState } from "react";

// import components
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { AUDIO_PLAYER_HEIGHT } from "@/lib/constants";

interface AudioPlayerProps {
  source: string;
}
const AudioPlayer = ({ source }: AudioPlayerProps) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // reference
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const durationLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    console.log("Called")
    if (!durationLoadedRef.current) {
      setDuration(timeProgress + 1);
      progressBarRef.current.max = (timeProgress + 1).toString()
      onLoadedMetadata()
    }
  }, [timeProgress]);

  source ??= "/recording.m4a";

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = audioRef.current.duration;
      console.log(seconds);
      if (isFinite(seconds)) {
        durationLoadedRef.current = true;
        setDuration(seconds);
        if (progressBarRef.current)
          progressBarRef.current.max = seconds.toString();
      }
    }
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    onLoadedMetadata();
  }, [source]);

  return (
    <>
      <audio
        src={source}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleEnd}
        className="w-full"
      />
      <div className="audio-player">
        <div className="flex  gap-2 md:container">
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              isPlaying,
              setIsPlaying,
              durationLoadedRef
            }}
          />
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
