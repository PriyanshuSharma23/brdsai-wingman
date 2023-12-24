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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as z from "zod";
import { Plus, PlusCircle, PlusIcon } from "lucide-react";

type AddPatientModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const addPatientSchema = z.object({
  recordingName: z.string(),
  patient: z.string().optional(),
});

const patients = [
  {
    name: "Ishaan Das",
    mrn: "MRN-5632-8975",
  },
  {
    name: "Priyanshu Sharma",
    mrn: "MRN-5632-8976",
  },
  {
    name: "Khushi Vohra",
    mrn: "MRN-5632-8977",
  },
  {
    name: "Dinesh Mehta",
    mrn: "MRN-5632-8978",
  },
];

export function AddRecordingModal({
  open,
  onOpenChange,
}: AddPatientModalProps) {
  const form = useForm<z.infer<typeof addPatientSchema>>({
    resolver: zodResolver(addPatientSchema),
  });

  const onSubmit = (values: z.infer<typeof addPatientSchema>) => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Recording</DialogTitle>
          <DialogDescription>
            Add a new recording for a patient.
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
                name="recordingName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Recording Name*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Example: Consultation with John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="patient"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Patient*</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select a patient" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Patients</SelectLabel>
                              {patients.map((patient) => (
                                <SelectItem
                                  value={patient.mrn}
                                  key={patient.mrn}
                                >
                                  {patient.name}
                                </SelectItem>
                              ))}
                              <button
                                value="add-patient"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log("Clicked on add patient");
                                }}
                                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-0 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-2 text-blu"
                              >
                                <PlusCircle size={18} />
                                Add Patient
                              </button>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
          <Button type="submit" className="w-full rounded-full">
            Start Recording
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
