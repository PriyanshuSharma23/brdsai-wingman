import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AudioPlayer from "@/components/audio/AudioPlayer";
import { NavWrapper } from "@/components/nav-parent";
import { ArrowLeft } from "lucide-react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddPatientModal } from "@/components/patient-modal";

const addPatientSchema = z.object({
  recordingName: z.string(),
  patient: z.string(),
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

interface SaveRecordingProps {
  closeWindow: () => void;
  audioSource: string | undefined;
}
export const SaveRecording = (props: SaveRecordingProps) => {
  const form = useForm<z.infer<typeof addPatientSchema>>({
    resolver: zodResolver(addPatientSchema),
  });

  const onSubmit = (values: z.infer<typeof addPatientSchema>) => {
    console.log({ values });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-white">
        <NavWrapper>
          <div className="flex items-center text-primary gap-2">
            <button className="translate-y-[2px]" onClick={props.closeWindow}>
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <p className="w-[20ch] overflow-hidden text-ellipsis line-clamp-1 max-w-max">
              Save Recording
            </p>
          </div>
        </NavWrapper>
        <div className="pt-8 container">
          {!!props.audioSource ? (
            <div>
              <div className="border py-4 px-4 mb-8">
                <AudioPlayer source={props.audioSource} />
              </div>
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
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={field.disabled}
                              name={field.name}
                            >
                              <SelectTrigger className="">
                                <SelectValue placeholder="Select a patient" />
                              </SelectTrigger>
                              <SelectContent
                                onBlur={field.onBlur}
                                ref={field.ref}
                              >
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
                                      setModalOpen(true);
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
                  <div className="pt-2"></div>
                  <Button type="submit" className="w-full rounded-full">
                    Save Recording
                  </Button>
                </form>
              </Form>
            </div>
          ) : (
            "No Audio Blob"
          )}
        </div>
      </div>
      <AddPatientModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};
