import request from "@/lib/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/store";

export const useAllNotesQuery = () => {
  const { user } = useStore();
  return useQuery({
    queryKey: ["notes"],

    queryFn: async () => {
      const resp = await request({
        method: "GET",
        url: "/brdsai/wingman/recording/getAllNotes",
      });
    },
    enabled: !!user,
  });
};
