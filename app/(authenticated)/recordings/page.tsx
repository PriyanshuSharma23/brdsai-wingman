"use client";
import Link from "next/link";
import { SearchIconInput } from "@/components/ui/icon-input";
import {
  Clock,
  Mic,
  MoreVertical,
  Play,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/action-button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAllRecordingsQuery } from "@/queries/recording/recordings-query";
import { LoadingCard } from "@/components/loading-card";
import { PatientCard } from "../patients/patient-card";
import { parseTimestamp } from "@/lib/utils";
import { useAudioPlayerState } from "@/state/global-audio-player";
import { EmptyRecordings } from "./empty-recordings";

export default function RecordingsPage() {
  const router = useRouter();

  const action = () => {
    router.push("/record");
  };

  const recordingsQuery = useAllRecordingsQuery();

  if (recordingsQuery.data && recordingsQuery.data.length === 0) {
    return <EmptyRecordings />;
  }

  return (
    <>
      <div className="px-4 md:px-12 xl:px-20 space-y-2 md:space-y-4 text-neutral-600 pt-6">
        <h1
          className="text-lg pt-5 flex items-center gap-1"
          style={{ fontWeight: 500 }}
        >
          <Mic size={20} />
          <span>Your Recordings</span>
        </h1>
        <div className="flex max-w-md items-center gap-2">
          <div className="flex-1">
            <SearchIconInput
              icon={<Search size={16} className="stroke-gray-400" />}
              className="w-full flex-1"
            />
          </div>
          <Button className="w-11 ">
            <SlidersHorizontal className="flex-shrink-0" size={19} />
          </Button>
        </div>

        <div className="space-y-4 py-2">
          {recordingsQuery.isLoading &&
            new Array(5).fill(0).map((_, i) => {
              return <LoadingCard key={i} />;
            })}

          {!!recordingsQuery.data &&
            recordingsQuery.data.map((recording) => {
              return (
                <AudioCard
                  id={recording.recording.id}
                  key={recording.recording.id}
                  name={recording.recording.recordingName}
                  recordedBy={recording.patient.name}
                  duration={
                    recording.recording.duration
                      ? parseTimestamp(recording.recording.duration, 2)
                      : "--:--"
                  }
                  audioKey={recording.recording.s3Key}
                />
              );
            })}
        </div>
      </div>

      <ActionButton onClick={action} />
    </>
  );
}

type AudioCardProps = {
  id: number;
  name: string;
  duration: string;
  recordedBy: string;
  audioKey: string;
};
function AudioCard(props: AudioCardProps) {
  const { audioS3Key, setAudios3Key, setVisible } = useAudioPlayerState();

  function playAudio(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setAudios3Key(props.audioKey);
    setVisible(true);
  }
  return (
    <Link href={"/recordings/" + props.id} className="block">
      <div className="flex w-full p-3 border rounded-md items-center gap-1 ">
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
          onClick={playAudio}
        >
          <Play size={18} className="text-blu translate-x-[1px]" />
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
