"use client";
import { useNoteQuery } from "@/queries/recording/note-query";
import { ActionsNav } from "../../recordings/recording-nav";
import { useEffect } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DummyBlock, TagNames } from "./dummy-block";
import { ArrowPatientCard } from "@/components/arrow-patient-card";
import { usePatientQuery } from "@/queries/patient/patient-query";
import { Mic } from "lucide-react";
import { AudioCard } from "@/components/audio-card";
import { useRecordingQuery } from "@/queries/recording/recording-query";
import { createAudioSourceFromKey, parseTimestamp } from "@/lib/utils";
import { LoadingCard } from "@/components/loading-card";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { AUDIO_PLAYER_HEIGHT } from "@/lib/constants";
import { useAudioPlayerState } from "@/state/global-audio-player";
import { useForm } from "react-hook-form";

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

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DNA } from "react-loader-spinner";

const noteTypes = [
  "History & Physical",
  "Progress Note",
  "Consult Note",
  "Discharge Summary",
];

type RecordingPageParams = {
  params: {
    id: string;
  };
};

const updatePatientSchema = z.object({
  noteFormat: z.string(),
});

export default function PatientsPage(params: RecordingPageParams) {
  const noteQuery = useNoteQuery({
    noteId: params.params.id,
  });

  const recording = useRecordingQuery({
    recordingId: noteQuery.data?.recordingId ?? -1,
  });

  const {
    visible,
    setVisible,
    setAudios3Key: setAudioSource,
    audioS3Key: audioSource,
  } = useAudioPlayerState();

  const form = useForm<z.infer<typeof updatePatientSchema>>({
    resolver: zodResolver(updatePatientSchema),
    defaultValues: {
      noteFormat: noteQuery.data?.noteFormat ?? "",
    },
  });

  useEffect(() => {
    form.setValue("noteFormat", noteQuery.data?.noteFormat ?? "");
  }, [noteQuery.data]);

  const onSubmit = (values: z.infer<typeof updatePatientSchema>) => {
    console.log(values);
  };

  return (
    <main className="flex flex-col">
      <ActionsNav
        resourceName="note"
        fallbackBackRoute="/note"
        name={noteQuery.data?.title ?? "Unnamed Note"}
        onEdit={function (newName: string): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <Tabs defaultValue="note-editor">
        <div className="sticky top-[4.5rem] bg-white z-10">
          <TabsList className="grid w-full grid-cols-2 bg-white ">
            <TabsTrigger
              value="note-editor"
              className="rounded-none border-b data-[state=active]:text-blu data-[state=active]:border-b-blu/70 data-[state=active]:border-b-2 text-md font-normal bg-white"
            >
              Note Editor
            </TabsTrigger>
            <TabsTrigger
              value="note-info"
              className="rounded-none border-b data-[state=active]:text-blu data-[state=active]:border-b-blu/70 data-[state=active]:border-b-2 text-md font-normal bg-white"
            >
              Note Info
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="note-editor" className="md:container py-8 px-4">
          {!noteQuery.data?.isProcessed && (
              <div className="flex items-center gap-2 text-neutral-500 justify-center relative">
                <div className="text-center pt-20 flex flex-col items-center">
                  <DNA />
                  {!!noteQuery.data ? (
                    <p>Generating Note</p>
                  ) : (
                    <p>Checking status</p>
                  )}
                </div>
              </div>
          )}
          {noteQuery.data?.blocks?.map((b, i) => (
            <>
              {i !== 0 && b.tagName === "h2" && (
                <hr className="border-gray-200 my-4" />
              )}
              <DummyBlock
                key={i}
                block={{
                  tagName: b.tagName as TagNames,
                  content: b.content,
                }}
              />
            </>
          ))}

          <div className="pt-20"></div>
        </TabsContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="note-info" className="px-4 ">
              <div className="md:container py-8 space-y-3">
                <FormField
                  control={form.control}
                  name="noteFormat"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>
                          Note Format<span className="text-red-400">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
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
              </div>
              <hr />
              <div className="md:container py-8 space-y-3">
                <div className="flex gap-2 items-center text-md text-neutral-600 ">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.666 13.75H7.33268C5.30764 13.75 3.66602 15.3916 3.66602 17.4167V19.25H18.3327V17.4167C18.3327 15.3916 16.6911 13.75 14.666 13.75Z"
                      stroke="#525252"
                      stroke-width="1.375"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.9993 10.0833C13.0244 10.0833 14.666 8.44171 14.666 6.41667C14.666 4.39162 13.0244 2.75 10.9993 2.75C8.97431 2.75 7.33268 4.39162 7.33268 6.41667C7.33268 8.44171 8.97431 10.0833 10.9993 10.0833Z"
                      stroke="#525252"
                      strokeWidth="1.375"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h2 className="text-lg">Associated Patient</h2>
                </div>
                <div className="pt-1"></div>
                <ArrowPatientCard
                  name={recording.data?.patient.name}
                  uniqueId={recording.data?.patient.uniqueId}
                  patientId={recording.data?.patient.id.toString()}
                />
              </div>

              <hr />
              <div className="md:container py-8 space-y-3">
                <div className="flex gap-2 items-center text-md text-neutral-600 ">
                  <Mic size={20} />
                  <h2 className="text-lg">Created from recording</h2>
                </div>
                {!recording.data ? (
                  <LoadingCard />
                ) : (
                  <AudioCard
                    id={recording.data?.recording.id}
                    key={recording.data?.recording.id}
                    name={recording.data?.recording.recordingName}
                    recordedBy={recording.data?.patient.name}
                    duration={
                      recording.data?.recording.duration
                        ? parseTimestamp(recording.data?.recording.duration, 2)
                        : "--:--"
                    }
                    durationNumber={
                      recording.data?.recording.duration ?? undefined
                    }
                    audioKey={recording.data?.recording.s3Key}
                  />
                )}
              </div>
              <hr />

              {/* create another div section with a button labelled update */}
              <div className="flex gap-2 items-center text-md text-neutral-600 pt-8">
                <Button className="rounded-full w-full">Update</Button>
              </div>
            </TabsContent>
          </form>
        </Form>
      </Tabs>

      <div className="fixed bottom-0 inset-x-0">
        {visible && (
          <div
            className="border-t bg-white py-4 px-10 md:px-14 "
            style={{
              height: `${AUDIO_PLAYER_HEIGHT}px`,
            }}
          >
            <AudioPlayer
              source={createAudioSourceFromKey(audioSource)}
              autoPlay={true}
              onEnd={() => {
                setVisible(false);
                setAudioSource("");
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
