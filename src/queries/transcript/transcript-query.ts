import request from "@/lib/customAxios";
import { Transcript } from "@/types/Transcript";
import { useQuery } from "@tanstack/react-query";

type UseTranscriptQueryProps = {
  transcriptId: number;
};
export const useTranscriptQuery = ({ transcriptId }: UseTranscriptQueryProps) => {
  return useQuery({
    queryKey: ["transcript", transcriptId],
    queryFn: async (params) => {
      let [, transcriptId] = params.queryKey as [string, number];
      let resp = await request({
        method: "GET",
        url: "/brdsai/wingman/recording/getTranscriptById/" + transcriptId.toString(),
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching patients");
      }

      return resp.data as Transcript;
    },
    refetchOnWindowFocus: false,
  });
};
