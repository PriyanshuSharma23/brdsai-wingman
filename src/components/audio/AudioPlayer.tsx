import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

// import components
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { create } from "zustand";

interface AudioPlayerState {
  duration: number;
  setDuration: (duration: number) => void;
  timeProgress: number;
  setTimeProgress: (timeProgress: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlayPause: () => void;
  disabled: boolean;
  durationLoaded: boolean;
  setDurationLoaded: (durationLoaded: boolean) => void;
}
const useAudioPlayerState = create<AudioPlayerState>((set, get) => ({
  duration: 0,
  setDuration: (duration) => set({ duration }),
  timeProgress: 0,
  setTimeProgress: (timeProgress) => set({ timeProgress }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  disabled: false,
  durationLoaded: false,
  setDurationLoaded: (durationLoaded) => set({ durationLoaded }),
}));

interface AudioPlayerProps {
  source?: string;
  onEnd?: () => void;
  autoPlay?: boolean;
  disabled?: boolean;
}
const AudioPlayer = ({
  source,
  onEnd,
  autoPlay = false,
  disabled = false,
}: AudioPlayerProps) => {
  const {
    togglePlayPause,
    duration,
    setDuration,
    timeProgress,
    setTimeProgress,
    isPlaying,
    setIsPlaying,
    durationLoaded,
    setDurationLoaded,
  } = useAudioPlayerState();

  // reference
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoPlay && source != "") {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }, [source, autoPlay, audioRef]);

  useEffect(() => {
    if (!durationLoaded && progressBarRef.current) {
      progressBarRef.current.max = (timeProgress + 1).toString();
      onLoadedMetadata();
    }
  }, [timeProgress, durationLoaded]);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = audioRef.current.duration;
      if (isFinite(seconds)) {
        setDurationLoaded(true);
        setDuration(seconds);
        if (progressBarRef.current)
          progressBarRef.current.max = seconds.toString();
      }
    }
  };

  const handleEnd = () => {
    setIsPlaying(false);
    onEnd?.();
  };

  return (
    <>
      <audio
        src={source}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleEnd}
        className="w-full"
        autoPlay
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
              disabled,
              durationLoaded,
              togglePlayPause,
            }}
          />
          <ProgressBar
            {...{
              progressBarRef,
              audioRef,
              timeProgress,
              duration,
              durationLoaded,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
