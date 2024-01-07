import request from "@/lib/customAxios";
import { isResponseOk } from "@/lib/utils";
import { Recording } from "@/types/Recording";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationProps = {
  id: number;
  patientId: number;
  recordingName?: string;
};
export const useEditRecordingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["recording", "update"],
    mutationFn: async (params: MutationProps) => {
      let resp = await request({
        url: "/brdsai/wingman/recording/editRecording",
        method: "PUT",
        data: params,
      });

      if (!isResponseOk(resp.status)) {
        throw new Error("error updating recording");
      }

      return resp.data as Recording;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recording"],
      });
    },
  });
};
