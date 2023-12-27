import request from "@/lib/customAxios";
import { useQuery } from "@tanstack/react-query";
import { Recording } from "@/types/Recording";
import { Patient } from "@/types/Patient";

export const useAllRecordingsQuery = () => {
  return useQuery({
    queryKey: ["recording"],
    queryFn: async () => {
      let resp = await request({
        method: "GET",
        url: "/brdsai/wingman/recording/getAllRecordings",
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching recordings");
      }

      return resp.data as { recording: Recording; patient: Patient }[];
    },
    refetchOnWindowFocus: false,
  });
};
