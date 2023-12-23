"use client";
import { cn } from "@/lib/utils";
import { useAudioPlayer } from "@/state/global-audio-player";

export const Spacer = () => {
  const isPlaying = useAudioPlayer(s => s.playing);
  return <div className={cn(isPlaying ? "pt-40" : "pt-24")}></div>;
};
