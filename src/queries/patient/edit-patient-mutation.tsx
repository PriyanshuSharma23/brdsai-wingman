import request from "@/lib/customAxios";
import { isResponseOk } from "@/lib/utils";
import { Patient } from "@/types/Patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationParams = {
    name: string;
    uniqueId: string;
    id: number;
};

export const useEditPatientMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["patients"],
        mutationFn: async (params: MutationParams) => {
            let resp = await request({
                url: "/brdsai/wingman/patient/editPatient",
                method: "PUT",
                data: params,
            });

            if (!isResponseOk(resp.status)) {
                throw new Error("Error updating patient details");
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
