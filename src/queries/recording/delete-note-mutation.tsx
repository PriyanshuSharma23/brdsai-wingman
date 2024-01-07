import request from "@/lib/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["note"],
    mutationFn: async (id: string) => {
      let resp = await request({
        method: "DELETE",
        url: "/brdsai/wingman/recording/deleteNote/" + id,
      });

      if (resp.status !== 200) {
        throw new Error("Error deleting recording");
      }

      return resp.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

}
