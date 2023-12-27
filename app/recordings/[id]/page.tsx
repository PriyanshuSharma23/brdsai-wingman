"use client";
import { SearchIconInput } from "@/components/ui/icon-input";
import { Search } from "lucide-react";
import { TranscriptSegment } from "./transcript-segment";
import { useRecordingQuery } from "@/queries/recording/recording-query";
import { useTranscriptByRecordingQuery } from "@/queries/transcript/transcript-by-recording-id-query";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { createAudioSourceFromKey } from "@/lib/utils";

type RecordingPageParams = {
  params: {
    id: string;
  };
};

export default function RecordingsPage(params: RecordingPageParams) {
  const recordingQuery = useRecordingQuery({
    recordingId: Number(params.params.id),
  });

  const transcriptQuery = useTranscriptByRecordingQuery({
    recordingId: Number(params.params.id),
  });

  const key = recordingQuery.data?.recording.s3Key;
  console.log(createAudioSourceFromKey(key ?? ""));

  return (
    <>
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
            active
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
