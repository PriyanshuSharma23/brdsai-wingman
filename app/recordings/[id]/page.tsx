import { SearchIconInput } from "@/components/ui/icon-input";
import { Search } from "lucide-react";
import { TranscriptSegment } from "./transcript-segment";

type RecordingPageParams = {
  params: {
    id: string;
  };
};

const transcript = [
  {
    timestamp: 0,
    transcript: "Hello World",
  },
  {
    timestamp: 200,
    transcript: "Hello World 200",
  },
  {
    timestamp: 4200,
    transcript: "Hello World 200",
  },
];

export default function RecordingsPage(params: RecordingPageParams) {
  const maxSegments = countTimesegments(transcript.at(-1)?.timestamp ?? 2);
  console.log(maxSegments);

  return (
    <>
      <div className="container space-y-2 md:space-y-4">
        <h1 className="text-lg pt-5" style={{ fontWeight: 500 }}>
          Transcription
        </h1>
        <SearchIconInput
          icon={<Search size={16} className="stroke-gray-400" />}
          placeholder="Search keywords"
        />
      </div>

      <div className="container space-y-4 py-6">
        {transcript.map((transcriptSegment) => (
          <TranscriptSegment
            {...transcriptSegment}
            timeSegments={maxSegments}
            key={transcriptSegment.timestamp}
            active
          />
        ))}
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
