import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/lib/customAxios";
import { isResponseOk } from "@/lib/utils";

type MutationParams = {
  name: string;
  /**
   * MRN in this case
   */
  uniqueId?: string;
};

export const useCreatePatientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["patient", "create"],
    mutationFn: async (params: MutationParams) => {
      let response = await request({
        method: "POST",
        url: "/brdsai/wingman/patient/createPatient",
        data: params,
      });

      if (!isResponseOk(response.status)) {
        throw new Error("Error creating patients");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
  });
};
