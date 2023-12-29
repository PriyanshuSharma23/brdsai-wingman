import { NavWrapper } from "@/components/nav-parent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Image from "next/image";
import * as z from "zod";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAllPatientQuery } from "@/queries/patient/all-patients-query";
import { useState } from "react";
import { AddPatientModal } from "@/components/patient-modal";
import { Textarea } from "@/components/ui/textarea";
import { useCreateNoteMutation } from "@/queries/recording/create-note-mutation";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const createNoteSchema = z.object({
  noteFormat: z.string().optional(),
  noteSetting: z.string().optional(),
  additionalPrompt: z.string().optional(),
  preferredLength: z.string().optional(),
});

const noteTypes = [
  "History & Physical",
  "Progress Note",
  "Consult Note",
  "Discharge Summary",
];

const noteSetting = ["inpatient", "outpatient"];

const noteLenghts = ["Short", "Normal", "Long"];

export function CreateNewNote({
  open,
  onOpenChange,
  closeWindow,
  recordingName,
  recordingId,
}: {
  open: boolean;
  onOpenChange: (newBool: boolean) => void;
  closeWindow: () => void;
  recordingName: string;
  recordingId: number;
}) {
  const form = useForm<z.infer<typeof createNoteSchema>>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      additionalPrompt: "",
      noteFormat: "",
      noteSetting: "",
      preferredLength: "",
    },
  });

  const [usingCustom, setUsingCustom] = useState(false);

  const createNoteMutation = useCreateNoteMutation();
  const onSubmit = (values: z.infer<typeof createNoteSchema>) => {
    if (
      !values.additionalPrompt?.trim() ||
      !(values.noteSetting && values.noteSetting)
    ) {
      toast.error(
        "Either enter a prompt or choose one of the pre-built defaults",
      );
      return;
    }
    createNoteMutation.mutate(
      {
        noteFormat: values.noteFormat,
        noteSetting: values.noteSetting,
        preferredLength: values.preferredLength,
        recordingId,
        customPrompt: values.additionalPrompt,
      },
      {
        onSuccess: () => {
          toast.success("Note created successfully");
          closeWindow();
        },
      },
    );
  };

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[100%]">
        <div className="absolute top-0 inset-x-0">
          <NavWrapper>
            <div className="flex items-center text-primary gap-4">
              <button className="translate-y-[2px]" onClick={closeWindow}>
                <ArrowLeft size={20} className="text-gray-500" />
              </button>
              <p className="overflow-hidden text-ellipsis line-clamp-1 max-w-max translate-y-[2px] text-neutral-600">
                Create note from{" "}
                <span className="text-blu">{recordingName}</span>
              </p>
            </div>
          </NavWrapper>
        </div>
        <div className="pt-16"></div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-2xl mx-auto flex flex-col flex-1 "
          >
            <FormField
              control={form.control}
              name="additionalPrompt"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className={cn(usingCustom && "text-gray-400")}>
                      Add your prompt here
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Example: Create a consult note for this patient and summarize the medical history"
                        rows={10}
                        {...field}
                        disabled={usingCustom}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="use-custom"
                checked={usingCustom}
                onCheckedChange={(checked) => setUsingCustom(checked.valueOf() as boolean)}
              />
              <label
                htmlFor="use-custom"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Or choose pre-built defaults
              </label>
            </div>
            {true && (
              <>
                <FormField
                  control={form.control}
                  name="noteFormat"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel
                          className={cn(!usingCustom && "text-gray-400")}
                        >
                          Note Format<span className="text-red-400">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            name={field.name}
                            disabled={!usingCustom}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select a patient" />
                            </SelectTrigger>
                            <SelectContent
                              onBlur={field.onBlur}
                              ref={field.ref}
                            >
                              <SelectGroup>
                                <SelectLabel>Note Formats</SelectLabel>
                                {noteTypes.map((type) => (
                                  <SelectItem
                                    value={type.toString()}
                                    key={type}
                                  >
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="noteSetting"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel
                          className={cn(!usingCustom && "text-gray-400")}
                        >
                          Setting<span className="text-red-400">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={!usingCustom}
                            name={field.name}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select setting of note" />
                            </SelectTrigger>
                            <SelectContent
                              onBlur={field.onBlur}
                              ref={field.ref}
                            >
                              <SelectGroup>
                                {noteSetting.map((setting) => (
                                  <SelectItem
                                    value={setting.toString()}
                                    key={setting}
                                  >
                                    {setting[0].toUpperCase() +
                                      setting.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="preferredLength"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      Preferred Length
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        name={field.name}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select length of note" />
                        </SelectTrigger>
                        <SelectContent onBlur={field.onBlur} ref={field.ref}>
                          <SelectGroup>
                            {noteLenghts.map((setting) => (
                              <SelectItem
                                value={setting.toString()}
                                key={setting}
                              >
                                {setting[0].toUpperCase() + setting.slice(1)}
                              </SelectItem>
                            ))}
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
              Create Note
            </Button>
          </form>
        </Form>

        <Image
          src={"/onboarding-fig-1.png"}
          alt="onboarding figure 1"
          width={290}
          height={343}
          className={`w-3/4 bottom-0 left-0 translate-y-1/4  absolute max-w-md rotate-45 -z-10 opacity-50`}
          priority
        />
        <AddPatientModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          closeModal={closeModal}
        />
      </SheetContent>
    </Sheet>
  );
}
