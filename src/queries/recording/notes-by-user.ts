import request from "@/lib/customAxios";
import { Note } from "@/types/Note";
import { useQuery } from "@tanstack/react-query";

export const useNotesByUser = () => {
  return useQuery({
    queryKey: ["notes", "by-user"],
    queryFn: async (params) => {
      let resp = await request({
        method: "GET",
        url: "/brdsai/wingman/recording/getNotesByUser",
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching notes of patient");
      }

      let data: Note[] = resp.data;

      let sorted = data.sort((a, b) => {
        let aDate = new Date(a.createdAt);
        let bDate = new Date(b.createdAt);

        return bDate.getTime() - aDate.getTime();
      });

      return sorted as Note[];
    },
    refetchOnWindowFocus: false,
  });
};
