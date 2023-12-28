import request from "@/lib/customAxios";
import { Recording } from "@/types/Recording";
import { useQuery } from "@tanstack/react-query";

type UseRecordingsByPatientProps = {
  patientId: number;
};
export const useRecordingsByPatient = ({
  patientId,
}: UseRecordingsByPatientProps) => {
  return useQuery({
    queryKey: ["recording", "by-patient", patientId],
    queryFn: async (params) => {
      let [, , patientId] = params.queryKey as [string, string, number];
      let resp = await request({
        method: "GET",
        url:
          "/brdsai/wingman/recording/getAllRecordingsByPatientId/" +
          patientId.toString(),
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching recordings of patient");
      }

      return resp.data.map((rec: any) => {
        return {
          ...rec,
          duration: rec.duration / 1000,
        };
      }) as Recording[];
    },
    refetchOnWindowFocus: false,
  });
};
