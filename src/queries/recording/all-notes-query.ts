import request from "@/lib/customAxios";
import { useQuery } from "@tanstack/react-query";

export const useAllNotesQuery = () => {
  return useQuery({
    queryKey: ["notes"],

    queryFn: async () => {
      const resp = await request({
        method: "GET",
        url: "/brdsai/wingman/recording/getAllNotes",
      });
    },
  });
};
