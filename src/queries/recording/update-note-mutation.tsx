import request from "@/lib/customAxios";
import { Note } from "@/types/Note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationFnParams = {
  title?: string;
  id: string;
};

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["note", "update"],
    mutationFn: async (params: MutationFnParams) => {
      let resp = await request({
        url: "/brdsai/wingman/recording/editNote",
        method: "PUT",
        data: params,
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching recordings");
      }
      return resp.data as Note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });
};
