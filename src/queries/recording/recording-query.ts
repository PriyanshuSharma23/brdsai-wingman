import request from "@/lib/customAxios";
import { Patient } from "@/types/Patient";
import { Recording } from "@/types/Recording";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/store";

type UseRecordingQueryProps = {
  recordingId: number;
};
export const useRecordingQuery = ({ recordingId }: UseRecordingQueryProps) => {
  const { user } = useStore();

  return useQuery({
    queryKey: ["recording", recordingId],
    queryFn: async (params) => {
      let [, recordingId] = params.queryKey as [string, number];
      let resp = await request({
        method: "GET",
        url:
          "/brdsai/wingman/recording/getRecordingById/" +
          recordingId.toString(),
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching patients");
      }

      return {
        ...resp.data,
        recording: {
          ...resp.data.recording,
          duration: resp.data.recording.duration / 1000,
        },
      } as { recording: Recording; patient: Patient };
    },
    refetchOnWindowFocus: false,
    enabled: !!user && recordingId !== -1,
  });
};
