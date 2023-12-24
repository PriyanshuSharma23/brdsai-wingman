"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useAudioPlayer } from "@/state/global-audio-player";
import { cn } from "@/lib/utils";
import { AUDIO_PLAYER_HEIGHT, BOTTOM_BAR_HEIGHT } from "@/lib/constants";

type ActionButtonProps = {
  onClick: () => void;
};

export const ActionButton = ({ onClick: action }: ActionButtonProps) => {
  const { visible } = useAudioPlayer();

  const bottom = BOTTOM_BAR_HEIGHT + (visible ? AUDIO_PLAYER_HEIGHT : 0) + 12;

  return (
    <Button onClick={action} className="fixed rounded-full h-12 w-12 shadow shadow-blu right-2 md:right-14" style={{ bottom }}>
      <Plus size={34} className="flex-shrink-0"/>
    </Button>
  );
};
