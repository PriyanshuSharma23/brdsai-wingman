import { cn, parseTimestamp } from "@/lib/utils";

type TranscriptSegmentProps = {
  timestamp: number;
  transcript: string;
  timeSegments: 2 | 3;
  active: boolean;
};

export const TranscriptSegment = (props: TranscriptSegmentProps) => {
  return (
    <p className={cn("", props.active && "text-blu")}>
      <span className="font-mono">[{parseTimestamp(props.timestamp, props.timeSegments)}]</span> {props.transcript}
    </p>
  );
};

