"use client";
import { ActionButton } from "@/components/action-button";
import { AudioCard } from "@/components/audio-card";
import { LoadingCard } from "@/components/loading-card";
import { Button } from "@/components/ui/button";
import { SearchIconInput } from "@/components/ui/icon-input";
import { parseTimestamp } from "@/lib/utils";
import { useAllRecordingsQuery } from "@/queries/recording/recordings-query";
import { Mic, Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
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
                  durationNumber={recording.recording.duration ?? undefined}
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
