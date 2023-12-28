import request from "@/lib/customAxios";
import { isResponseOk } from "@/lib/utils";
import { Note } from "@/types/Note";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type UseNoteQueryProps = {
  noteId: string;
};
export const useNoteQuery = ({ noteId }: UseNoteQueryProps) => {
  const [refetchInterval, setRefetchInterval] = useState<number | false>(5000);

  let noteQuery = useQuery({
    queryKey: ["note", noteId],
    queryFn: async (params) => {
      let [, noteId] = params.queryKey as string[];

      let response = await request({
        method: "GET",
        url: "/brdsai/wingman/recording/getNoteById/" + noteId,
      });

      if (!isResponseOk(response.status)) {
        throw new Error("Error fetching note");
      }

      return response.data as Note;
    },
    refetchInterval,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (noteQuery.data) {
      if (noteQuery.data.isProcessed === true) {
        setRefetchInterval(false);
      }
    }
  }, [noteQuery.data, noteQuery.isLoading, noteQuery.isFetching]);

  return noteQuery;
};
