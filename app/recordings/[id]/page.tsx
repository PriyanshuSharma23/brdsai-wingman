"use client";
import { SearchIconInput } from "@/components/ui/icon-input";
import { Search } from "lucide-react";
import { TranscriptSegment } from "./transcript-segment";
import { useRecordingQuery } from "@/queries/recording/recording-query";
import { useTranscriptByRecordingQuery } from "@/queries/transcript/transcript-by-recording-id-query";
import AudioPlayer, { useAudioPlayer } from "@/components/audio/AudioPlayer";
import { createAudioSourceFromKey } from "@/lib/utils";
import { useEffect } from "react";
import { ActionsNav } from "../recording-nav";

type RecordingPageParams = {
  params: {
    id: string;
  };
};

export default function RecordingsPage(params: RecordingPageParams) {
  const recordingQuery = useRecordingQuery({
    recordingId: Number(params.params.id),
  });

  console.log(recordingQuery.data);

  const transcriptQuery = useTranscriptByRecordingQuery({
    recordingId: Number(params.params.id),
  });

  const key = recordingQuery.data?.recording.s3Key;
  console.log(createAudioSourceFromKey(key ?? ""));

  const loadWithDuration = useAudioPlayer((s) => s.loadWithDuration);
  const seekAndPlay = useAudioPlayer((s) => s.seekAndPlay);
  const timeProgress = useAudioPlayer((s) => s.timeProgress);

  useEffect(() => {
    loadWithDuration(Number(recordingQuery.data?.recording.duration));
  }, [recordingQuery.data]);

  const isActive = (timestamp: number, start: number, end: number) => {
    return timestamp >= start && timestamp <= end;
  };

  return (
    <>
      <ActionsNav
        resourceName="recording"
        fallbackBackRoute="/recordings"
        name={"Consultation with Naman"}
        onEdit={function (newName: string): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="container space-y-2 md:space-y-4 sticky top-20 bg-white">
        <h1 className="text-lg pt-5" style={{ fontWeight: 500 }}>
          Transcription
        </h1>
        <SearchIconInput
          icon={<Search size={16} className="stroke-gray-400" />}
          placeholder="Search keywords"
        />
      </div>

      <div className="container space-y-4 py-6 flex-1">
        {transcriptQuery.data?.segments?.map((transcriptSegment) => (
          <TranscriptSegment
            timestamp={Number(transcriptSegment.start)}
            transcript={transcriptSegment.text}
            timeSegments={2}
            key={transcriptSegment.start}
            active={isActive(
              timeProgress,
              Number(transcriptSegment.start),
              Number(transcriptSegment.end)
            )}
            onClick={() => {
              console.log("seeking");
              seekAndPlay(Number(transcriptSegment.start));
            }}
          />
        ))}
      </div>

      <div className="pt-32"></div>

      <div className="w-full container bg-white py-6 fixed bottom-0 inset-x-0 border-t">
        <AudioPlayer
          source={key ? createAudioSourceFromKey(key) : ""}
          disabled={!key}
        />
      </div>
    </>
  );
}

function countTimesegments(timestamp: number): 2 | 3 {
  if (timestamp >= 3600) {
    return 3;
  } else {
    return 2;
  }
}
