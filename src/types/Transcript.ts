export type Transcript = {
  id: string;
  userId: number;
  recordingId: number;
  createdAt: string;
  text: string;
  segments: TranscriptSegment[];
  isProcessed: boolean;
};

type TranscriptSegment = {
  text: string;
  start: string;
  end: string;
};
