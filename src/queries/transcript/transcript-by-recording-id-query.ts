import request from "@/lib/customAxios";
import { useQuery } from "@tanstack/react-query";
import { Transcript } from "@/types/Transcript";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_RETRY_INTERVAL } from "@/lib/constants";
import { useStore } from "@/store/store";

type UseTranscriptByRecordingQueryProps = {
  recordingId: number;
};
export const useTranscriptByRecordingQuery = (
  props: UseTranscriptByRecordingQueryProps
) => {
  const [refetchInterval, setRefetchInterval] = useState<number | false>(DEFAULT_RETRY_INTERVAL);
  const { user } = useStore();

  const transcriptQuery = useQuery({
    queryKey: ["transcript", "by-recording", props.recordingId],
    queryFn: async (params) => {
      let [, , recordingId] = params.queryKey as [string, string, number];
      let resp = await request({
        method: "GET",
        url:
          "/brdsai/wingman/recording/getTranscriptByRecordingId/" +
          recordingId.toString(),
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching recordings of patient");
      }

      return resp.data as Transcript;
    },
    refetchInterval,
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  useEffect(() => {
    if (transcriptQuery.data) {
      if (transcriptQuery.data.isProcessed === true) {
        setRefetchInterval(false);
      }
    }
  }, [
    transcriptQuery.data,
    transcriptQuery.isLoading,
    transcriptQuery.isFetching,
  ]);

  return transcriptQuery;
};

function logarithmicInterpolation(
  minInterval: number,
  maxInterval: number,
  callCount: number
) {
  console.log("called");
  // Ensure callCount is at least 1
  callCount = Math.max(callCount, 1);

  // Calculate the logarithmic interpolation factor
  const interpolationFactor = Math.log(callCount);

  // Map the interpolation factor to the range [0, 1]
  const normalizedFactor = interpolationFactor / Math.log(callCount);

  // Interpolate between minInterval and maxInterval
  const result = minInterval + normalizedFactor * (maxInterval - minInterval);

  return result;
}
