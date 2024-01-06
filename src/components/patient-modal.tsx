import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreatePatientMutation } from "@/queries/patient/create-patient-mutation";
import { toast } from "sonner";

type AddPatientModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeModal: () => void;
};

const addPatientSchema = z.object({
  name: z.string(),
  mrn: z.string().optional(),
});

export function AddPatientModal({
  open,
  onOpenChange,
  closeModal,
}: AddPatientModalProps) {
  const form = useForm<z.infer<typeof addPatientSchema>>({
    resolver: zodResolver(addPatientSchema),
  });

  const createPatientMutation = useCreatePatientMutation();

  const onSubmit = (values: z.infer<typeof addPatientSchema>) => {
    createPatientMutation.mutate(
      {
        name: values.name,
        uniqueId: values.mrn,
      },
      {
        onSuccess() {
          toast.success("Patient created");
          closeModal();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[390px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
          <DialogDescription>
            Add patient details for adding a new patient.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-4 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-sm flex flex-col flex-1 "
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-black">
                        Patient Name<span className="text-[#EF4E4E]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Mr. Bojangles" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="mrn"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-black">MRN</FormLabel>
                      <FormControl>
                        <Input placeholder="MRN-5632-8975" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <DialogFooter className="mt-4">
                <Button
                  type="submit"
                  className="w-full rounded-full"
                  disabled={createPatientMutation.isPending}
                >
                  Add Patient
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
