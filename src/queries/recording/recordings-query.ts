import request from "@/lib/customAxios";
import { useQuery } from "@tanstack/react-query";
import { Recording } from "@/types/Recording";

export const useAllPatientQuery = () => {
  return useQuery({
    queryKey: ["recording"],
    queryFn: async () => {
      let resp = await request({
        method: "GET",
        url: "/brdsai/wingman/recordings/getAllRecordings",
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching recordings");
      }

      return resp.data as Recording[]
    },
    refetchOnWindowFocus: false,
  });
};
