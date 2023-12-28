"use client";
import { useAudioPlayer } from "@/components/audio/AudioPlayer";
import { useAudioPlayerState } from "@/state/global-audio-player";
import { Clock, Mic, MoreVertical, Pause, Play } from "lucide-react";
import Link from "next/link";

type AudioCardProps = {
  id: number;
  name: string;
  duration: string;
  recordedBy: string;
  audioKey: string;
  durationNumber?: number;
};
export function AudioCard(props: AudioCardProps) {
  const { audioS3Key, setAudios3Key, setVisible } = useAudioPlayerState();
  const { loadWithDuration } = useAudioPlayer();

  function playAudio() {
    setAudios3Key(props.audioKey);
    setVisible(true);
    if (props.durationNumber) {
      loadWithDuration(props.durationNumber);
    }
  }

  const isPlaying = useAudioPlayer((s) => s.isPlaying);
  const togglePlayPause = useAudioPlayer((s) => s.togglePlayPause);

  function handleAction(e: any) {
    e.preventDefault();
    e.stopPropagation();

    if (audioS3Key === props.audioKey) {
      togglePlayPause();
    } else {
      playAudio();
    }
  }

  return (
    <Link href={"/recordings/" + props.id} className="block">
      <div className="flex w-full p-3 border rounded-md items-center gap-1 py-4">
        <div className="space-y-1 ">
          <div className="flex gap-1 items-center text-blu ">
            <Mic size={18} />
            <p className="line-clamp-1">{props.name}</p>
          </div>
          <div className="flex items-center gap-1">
            {user}
            <p className="text-sm text-gray-400">{props.recordedBy}</p>
          </div>
        </div>

        <div className="flex-1"></div>

        <div className="flex items-center gap-1 mr-2">
          <Clock className="stroke-gray-400" size={14} />
          <p className="text-sm text-gray-400">{props.duration}</p>
        </div>
        <button
          className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-full grid place-content-center flex-shrink-0"
          onClick={handleAction}
        >
          {audioS3Key === props.audioKey ? (
            isPlaying ? (
              <Pause size={18} className="text-blu translate-x-[1px]" />
            ) : (
              <Play size={18} className="text-blu translate-x-[1px]" />
            )
          ) : (
            <Play size={18} className="text-blu translate-x-[1px]" />
          )}
        </button>
        <button>
          <MoreVertical size={18} className="text-gray-400" />
        </button>
      </div>
    </Link>
  );
}

const user = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.666 10H5.33268C3.85992 10 2.66602 11.1939 2.66602 12.6667V14H13.3327V12.6667C13.3327 11.1939 12.1388 10 10.666 10Z"
      stroke="#525252"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.99935 7.33333C9.47211 7.33333 10.666 6.13943 10.666 4.66667C10.666 3.19391 9.47211 2 7.99935 2C6.52659 2 5.33268 3.19391 5.33268 4.66667C5.33268 6.13943 6.52659 7.33333 7.99935 7.33333Z"
      stroke="#525252"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
