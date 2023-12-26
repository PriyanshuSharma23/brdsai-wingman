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

type AddPatientModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const addPatientSchema = z.object({
  name: z.string(),
  mrn: z.string().optional(),
});

export function AddPatientModal({ open, onOpenChange }: AddPatientModalProps) {
  const form = useForm<z.infer<typeof addPatientSchema>>({
    resolver: zodResolver(addPatientSchema),
  });

  const onSubmit = (values: z.infer<typeof addPatientSchema>) => { 
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
          <DialogDescription>
            Add patient details for adding a new patient.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
                      <FormLabel>Patient Name*</FormLabel>
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
                      <FormLabel>MRN*</FormLabel>
                      <FormControl>
                        <Input placeholder="MRN-5632-8975" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full rounded-full">Add Patient</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
