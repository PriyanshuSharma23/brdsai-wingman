import request from "@/lib/customAxios";
import { Transcript } from "@/types/Transcript";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/store";

type UseTranscriptQueryProps = {
  transcriptId: number;
};
export const useTranscriptQuery = ({ transcriptId }: UseTranscriptQueryProps) => {
  const { user } = useStore();
  return useQuery({
    queryKey: ["transcript", transcriptId],
    queryFn: async (params) => {
      let [, transcriptId] = params.queryKey as [string, number];
      let resp = await request({
        method: "GET",
        url: "/brdsai/wingman/recording/getTranscriptById/" + transcriptId.toString(),
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching transcript");
      }

      return resp.data as Transcript;
    },
    refetchOnWindowFocus: false,
    enabled: !!user,
  });
};
