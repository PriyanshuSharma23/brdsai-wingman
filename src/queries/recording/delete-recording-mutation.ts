import request from "@/lib/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteRecordingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["recording"],
    mutationFn: async (id: string) => {
      let resp = await request({
        method: "DELETE",
        url: "/brdsai/wingman/recording/deleteRecording/" + id,
      });

      if (resp.status !== 200) {
        throw new Error("Error deleting recording");
      }

      return resp.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recording"],
      });
    },
  });
};
