import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/lib/customAxios";
import { isResponseOk } from "@/lib/utils";
import { Note } from "@/types/Note";

type MutationParams = {
  recordingId: number;
  noteFormat?: string;
  preferredLength?: string;
  noteSetting?: string;
  customPrompt?: string;
};

export const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["note", "create"],
    mutationFn: async (params: MutationParams) => {
      let response = await request({
        method: "POST",
        url: "/brdsai/wingman/recording/createNote",
        data: params,
      });

      if (!isResponseOk(response.status)) {
        throw new Error("Error creating patients");
      }

      return response.data as Note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
  });
};
