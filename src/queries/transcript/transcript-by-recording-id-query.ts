import request from "@/lib/customAxios";
import { useQuery } from "@tanstack/react-query";
import { Transcript } from "@/types/Transcript";
import { useEffect, useState } from "react";

type UseTranscriptByRecordingQueryProps = {
  recordingId: number;
};
export const useTranscriptByRecordingQuery = (
  props: UseTranscriptByRecordingQueryProps
) => {
  const [refetchInterval, setRefetchInterval] = useState<number | false>(1000);

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
