import request from "@/lib/customAxios";
import { useStore } from "@/store/store";
import { Patient } from "@/types/Patient";
import { useQuery } from "@tanstack/react-query";

export const useAllPatientQuery = () => {
  const { user } = useStore();
  return useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      let resp = await request({
        method: "GET",
        url: "/brdsai/wingman/patient/getAllPatients",
      });

      if (resp.status !== 200) {
        throw new Error("Error fetching patients");
      }

      let data: Patient[] = resp.data;

      let sorted = data.sort((a, b) => {
        let aDate = new Date(a.createdAt);
        let bDate = new Date(b.createdAt);

        return bDate.getTime() - aDate.getTime();
      });

      return sorted as Patient[];
    },
    refetchOnWindowFocus: false,
    enabled: !!user,
  });
};
