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
  audioRef?: RefObject<HTMLAudioElement>;
  progressBarRef?: RefObject<HTMLInputElement>;
  setAudioRef: (audioRef: RefObject<HTMLAudioElement>) => void;
  setProgressBarRef: (progressBarRef: RefObject<HTMLInputElement>) => void;
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

  loadWithDuration: (duration: number) => void;
  seek: (time: number) => void;
  seekAndPlay: (time: number) => void;
}

export const useAudioPlayer = create<AudioPlayerState>((set, get) => ({
  audioRef: undefined,
  progressBarRef: undefined,
  setAudioRef: (audioRef) => set({ audioRef }),
  setProgressBarRef: (progressBarRef) => set({ progressBarRef }),
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

  loadWithDuration: (duration) => {
    console.log("loadWithDuration", duration);
    set({ duration });
    setTimeout(() => {
      document
        .getElementById("progress-bar")
        ?.setAttribute("max", duration.toString());
    }, 100);
  },

  seek: (time: number) => {
    setTimeout(() => {
      console.log(document.getElementById("audio-player"));
      const state = get();
      if (state.audioRef && state.audioRef.current)
        state.audioRef.current.currentTime = time;
    }, 10);
  },

  seekAndPlay: (time: number) => {
    set({ isPlaying: true });
    setTimeout(() => {
      const state = get();
      if (state.audioRef && state.audioRef.current) {
        state.audioRef.current.currentTime = time;
        state.audioRef.current.play();
      }
    }, 10);
  },
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
    setAudioRef,
    setProgressBarRef,
  } = useAudioPlayer();

  // reference
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAudioRef(audioRef);
    setProgressBarRef(progressBarRef);
  }, []);

  useEffect(() => {
    if (autoPlay && source != "") {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }, [source, autoPlay, audioRef]);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      let seconds = audioRef.current.duration;

      if (isFinite(seconds)) {
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
        id="audio-player"
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
              togglePlayPause,
            }}
          />
          <ProgressBar
            {...{
              progressBarRef,
              audioRef,
              timeProgress,
              duration,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
