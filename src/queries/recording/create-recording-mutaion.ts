import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/lib/customAxios";
import { isResponseOk } from "@/lib/utils";
import { Recording } from "@/types/Recording";

type MutationParams = {
  recordingName: string;
  patientId: number;
  recordingFile: Blob;
  duration: number;
  extension: string;
};

export const useCreateRecordingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["recording", "create"],
    mutationFn: async (params: MutationParams) => {
      let formData = new FormData();
      formData.set("recordingName", params.recordingName);
      formData.set("patientId", params.patientId.toString());
      formData.set("duration", params.duration.toString());
      formData.set("recordingFile", params.recordingFile);
      formData.set("extension", params.extension);

      let response = await request({
        method: "POST",
        url: "/brdsai/wingman/recording/createRecording",
        data: formData,
      });

      if (!isResponseOk(response.status)) {
        throw new Error("Error creating patients");
      }

      return response.data as Recording;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recording"] });
    },
  });
};
