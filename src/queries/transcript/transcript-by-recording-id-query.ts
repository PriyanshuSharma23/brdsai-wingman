import request from "@/lib/customAxios";
import { useQuery } from "@tanstack/react-query";
import { Transcript } from "@/types/Transcript";

type UseTranscriptByRecordingQueryProps = {
  recordingId: number;
};
export const useTranscriptByRecordingQuery = (
  props: UseTranscriptByRecordingQueryProps,
) => {
  return useQuery({
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
    refetchOnWindowFocus: false,
  });
};
