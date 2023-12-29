import request from "@/lib/customAxios";
import { isResponseOk } from "@/lib/utils";
import { Recording } from "@/types/Recording";
import { useMutation } from "@tanstack/react-query"

type MutationProps = {
}
export const useEditRecordingMutation = () => {
  return useMutation({
    mutationKey: ["recording", "update"],
    mutationFn: async (params: MutationProps) => {

      let finalObj: Record<string, any> = {};
      if ('recordingName' in params) {
        finalObj['recordingName'] = params.recordingName;
      }

      let resp = await request({
        url: "/brdsai/wingman/recording/editRecording",
        method: "PUT",
        data: finalObj
      });

      if (!isResponseOk(resp.status)) {
        throw new Error("error updating recording");
      }

      return resp.data as Recording;
    }
  });
}
