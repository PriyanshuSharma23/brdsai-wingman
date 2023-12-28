import request from "@/lib/customAxios";
import { isResponseOk } from "@/lib/utils";
import { Note } from "@/types/Note";
import { useQuery } from "@tanstack/react-query";

export const useNotesByRecordingQuery = (
  recordingId: number,
  disabled: boolean = false
) => {
  return useQuery({
    queryKey: ["note", "by-recording", recordingId],
    queryFn: async () => {
      let response = await request({
        method: "GET",
        url: "/brdsai/wingman/recording/getNotesByRecordingId/" + recordingId,
      });

      if (!isResponseOk(response.status)) {
        throw new Error("Error fetching notes");
      }

      return response.data as Note[];
    },
    enabled: !disabled,
  });
};
