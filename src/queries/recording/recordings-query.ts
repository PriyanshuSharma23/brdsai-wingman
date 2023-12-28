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

      let data = resp.data.map((e: any) => ({
        patient: e.patient,
        recording: {
          ...e.recording,
          duration: (e.recording.duration ?? 0) / 1000,
        },
      })) as { recording: Recording; patient: Patient }[];

      data.sort((a, b) => {
        let bD = dateToNumber(new Date(b.recording.createdAt));
        let aD = dateToNumber(new Date(a.recording.createdAt));
        return bD - aD;
      });

      return data;
    },
    refetchOnWindowFocus: false,
  });
};

function dateToNumber(date: Date) {
  return date.getTime();
}
