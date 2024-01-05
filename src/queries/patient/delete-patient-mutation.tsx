import request from "@/lib/customAxios";
import { isResponseOk } from "@/lib/utils";
import { Patient } from "@/types/Patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationParams = {
    id: number;
};

export const useDeletePatientMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["patients"],
        mutationFn: async (params: MutationParams) => {
            let resp = await request({
                url: `/brdsai/wingman/patient/deletePatient/${params.id}`,
                method: "DELETE",
            });

            if (!isResponseOk(resp.status)) {
                throw new Error("Error deleting patient");
            }

            return resp.data as Patient;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["patients"]
            })
        }
    });
};
