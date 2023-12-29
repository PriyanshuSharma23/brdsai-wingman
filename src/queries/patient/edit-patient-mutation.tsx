// import request from "@/lib/customAxios";
// import { isResponseOk } from "@/lib/utils";
// import { useMutation } from "@tanstack/react-query";
//
// type MutationParams = {
//   name: string;
//   uniqueId: string;
// };
//
// export const useEditPatientMutation = () => {
//   return useMutation({
//     mutationKey: ["patients"],
//     mutationFn: async (params: MutationParams) => {
//       let resp = await request({
//         url: "/brdsai/wingman/patient/editPatient",
//         method: "PUT",
//         data: params,
//       });
//
//         if (!isResponseOk
//     },
//   });
// };
