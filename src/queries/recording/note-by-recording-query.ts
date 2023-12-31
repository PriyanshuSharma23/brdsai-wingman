import request from "@/lib/customAxios";
import { isResponseOk } from "@/lib/utils";
import { Note } from "@/types/Note";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/store";

export const useNotesByRecordingQuery = (
  recordingId: number,
  disabled: boolean = false
) => {
  const { user } = useStore();

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

      let data = response.data as Note[];
      let reversedData = data.reverse();

      return reversedData;
    },
    enabled: !!user && !disabled,
  });
};
