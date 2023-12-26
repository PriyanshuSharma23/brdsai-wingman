import request from "@/lib/customAxios";
import { Patient } from "@/types/Patient";
import { useQuery } from "@tanstack/react-query";

export const useAllPatientQuery = () => {
  return useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      let resp = await request({
        method: "GET",
        url: "/brdsai/wingman/patient/getAllPatients",
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching patients");
      }

      return resp.data as Patient[]
    },
    refetchOnWindowFocus: false,
  });
};
