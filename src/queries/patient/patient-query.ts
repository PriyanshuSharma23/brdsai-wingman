import request from "@/lib/customAxios";
import { Patient } from "@/types/Patient";
import { useQuery } from "@tanstack/react-query";

type UsePatientQueryProps = {
  patientId: number;
};
export const usePatientQuery = ({ patientId }: UsePatientQueryProps) => {
  return useQuery({
    queryKey: ["patient", patientId],
    queryFn: async (params) => {
      let [, patientId] = params.queryKey as [string, number];
      let resp = await request({
        method: "GET",
        url: "/brdsai/wingman/patient/getPatientById/" + patientId.toString(),
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching patients");
      }

      return resp.data as Patient;
    },
    refetchOnWindowFocus: false,
  });
};
