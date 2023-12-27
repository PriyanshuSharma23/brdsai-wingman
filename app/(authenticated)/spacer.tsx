"use client";
import { cn } from "@/lib/utils";
import { useAudioPlayerState } from "@/state/global-audio-player";

export const Spacer = () => {
  const visible = useAudioPlayerState(s => s.visible);
  return <div className={cn(visible ? "pt-52" : "pt-24")}></div>;
};
