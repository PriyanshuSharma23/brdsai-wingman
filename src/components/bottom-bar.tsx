"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";
import { cn, createAudioSourceFromKey } from "@/lib/utils";
import { AUDIO_PLAYER_HEIGHT, BOTTOM_BAR_HEIGHT } from "@/lib/constants";
import AudioPlayer from "./audio/AudioPlayer";
import { useAudioPlayerState } from "@/state/global-audio-player";

const PATHS = {
  "/": {
    name: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 31 31"
        fill="none"
        stroke="currentColor"
        className="flex-shrink-0"
      >
        <path
          d="M5.48828 12.6954L15.4984 3.93652L25.5086 12.6954L25.5086 25.2081H19.2523V20.203C19.2523 19.2075 18.8568 18.2527 18.1528 17.5487C17.4488 16.8447 16.494 16.4492 15.4984 16.4492C14.5029 16.4492 13.5481 16.8447 12.8441 17.5487C12.1401 18.2527 11.7446 19.2075 11.7446 20.203V25.2081H5.48829L5.48828 12.6954Z"
          strokeWidth="1.87691"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  "/patients": {
    name: "Patients",
    icon: (
      <svg
        viewBox="0 0 39 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-9 mb-1"
        stroke="currentColor"
      >
        <path
          d="M29.0442 23.334V21.7716C29.0442 18.3199 26.1953 15.5218 22.6809 15.5218H16.3175C12.8032 15.5218 9.95419 18.3199 9.95419 21.7716V23.334M36.9984 23.334V21.7716C36.9984 18.3199 34.1495 15.5218 30.6351 15.5218H29.8397M2 23.334V21.7716C2 18.3199 4.84897 15.5218 8.36335 15.5218H9.15877M27.4534 10.8345C30.0892 10.8345 32.2259 8.73597 32.2259 6.14725C32.2259 3.55853 30.0892 1.45996 27.4534 1.45996M11.545 10.8345C8.90924 10.8345 6.77251 8.73597 6.77251 6.14725C6.77251 3.55853 8.90924 1.45996 11.545 1.45996M24.2717 6.14725C24.2717 8.73597 22.135 10.8345 19.4992 10.8345C16.8634 10.8345 14.7267 8.73597 14.7267 6.14725C14.7267 3.55853 16.8634 1.45996 19.4992 1.45996C22.135 1.45996 24.2717 3.55853 24.2717 6.14725Z"
          strokeWidth="2.21282"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  "/recordings": {
    name: "Recordings",
    icon: <Mic className="flex-shrink-0 w-7 aspect-square" />,
  },
};

export const BottomBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    visible,
    setVisible,
    setAudios3Key: setAudioSource,
    audioS3Key: audioSource,
  } = useAudioPlayerState();

  return (
    <div className="fixed bottom-0 w-full">
      {visible && (
        <div
          className="border-t bg-white py-4 px-10 md:px-14 "
          style={{
            height: `${AUDIO_PLAYER_HEIGHT}px`,
          }}
        >
          <AudioPlayer
            source={createAudioSourceFromKey(audioSource)}
            autoPlay={true}
            onEnd={() => {
              setVisible(false);
              setAudioSource("");
            }}
          />
        </div>
      )}
      <div className="border-t">
        <div
          className="flex container justify-between  bg-white"
          style={{
            height: `${BOTTOM_BAR_HEIGHT}px`,
          }}
        >
          {Object.entries(PATHS).map(([key, path]) => (
            <Button
              variant={"ghost"}
              key={path.name}
              className={cn(
                "flex-col py-2 h-auto ",
                pathname == key ? "text-blu hover:text-blu" : "text-gray-400"
              )}
              onClick={() => router.push(key)}
            >
              {path.icon}
              {path.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
