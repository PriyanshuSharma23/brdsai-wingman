import request from "@/lib/customAxios";
import { Note } from "@/types/Note";
import { useQuery } from "@tanstack/react-query";

type UseNotesByPatientProps = {
  patientId: number;
};

export const useNotesByPatient = ({ patientId }: UseNotesByPatientProps) => {
  return useQuery({
    queryKey: ["notes", "by-patient", patientId],
    queryFn: async (params) => {
      let [, , patientId] = params.queryKey as [string, string, number];
      let resp = await request({
        method: "GET",
        url:
          "/brdsai/wingman/recording/getNotesByPatientId/" +
          patientId.toString(),
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
