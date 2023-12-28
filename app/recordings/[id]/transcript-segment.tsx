import { cn, parseTimestamp } from "@/lib/utils";

type TranscriptSegmentProps = {
  timestamp: number;
  transcript: string;
  timeSegments: 2 | 3;
  active: boolean;
  onClick?: () => void;
};

export const TranscriptSegment = (props: TranscriptSegmentProps) => {
  return (
    <p className={cn("cursor-pointer", props.active && "text-blu")} onClick={props.onClick}>
      <span className="font-mono">
        [{parseTimestamp(props.timestamp, props.timeSegments)}]
      </span>{" "}
      {props.transcript}
    </p>
  );
};
