"use client";
import { useNoteQuery } from "@/queries/recording/note-query";
import { ActionsNav } from "../../recordings/recording-nav";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DummyBlock, TagNames } from "./dummy-block";
import { ArrowPatientCard } from "@/components/arrow-patient-card";
import { Cog, Mic } from "lucide-react";
import { AudioCard } from "@/components/audio-card";
import { useRecordingQuery } from "@/queries/recording/recording-query";
import { createAudioSourceFromKey, parseTimestamp } from "@/lib/utils";
import { LoadingCard } from "@/components/loading-card";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { AUDIO_PLAYER_HEIGHT } from "@/lib/constants";
import { useAudioPlayerState } from "@/state/global-audio-player";

import { DNA } from "react-loader-spinner";
import { useUpdateNoteMutation } from "@/queries/recording/update-note-mutation";
import { useDeleteNoteMutation } from "@/queries/recording/delete-note-mutation";
import { useBack } from "@/queries/custom/useBack";
import { toast } from "sonner";

type RecordingPageParams = {
  params: {
    id: string;
  };
};

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

  const editNoteMutation = useUpdateNoteMutation();
  const deleteNoteMutation = useDeleteNoteMutation();

  const back = useBack("/");

  return (
    <main className="flex flex-col">
      <ActionsNav
        resourceName="note"
        fallbackBackRoute="/note"
        name={noteQuery.data?.title ?? "Unnamed Note"}
        isMutating={editNoteMutation.isPending || deleteNoteMutation.isPending}
        onEdit={function (newName: string): void {
          editNoteMutation.mutate(
            {
              title: newName,
              id: params.params.id,
            },
            {
              onSuccess: () => {
                toast.success("Updated note");
              },
              onError: () => {
                toast.error("Error updating note");
              },
            },
          );
        }}
        onDelete={function (): void {
          deleteNoteMutation.mutate(params.params.id, {
            onSuccess: () => {
              toast.success("Deleted note");
              back();
            },
            onError: () => {
              toast.error("Error deleting note");
            },
          });
        }}
      />

      <Tabs defaultValue="note-editor">
        <div className="sticky top-[3.5rem] bg-white z-10">
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

        <TabsContent value="note-editor" className="md:container py-4 px-4">
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
              {i !== 0 && b.tagName === "h2" && <div className="my-4" />}
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
        <TabsContent value="note-info" className="px-4 ">
          <div className="md:container py-3 space-y-3">
            <div className="flex gap-2 items-center text-md text-neutral-600 ">
              <Cog size={20} />
              <h2 className="text-lg">Note Configuration</h2>
            </div>
            <div className={"grid grid-cols-1 gap-2 lg:grid-cols-4"}>
              {!noteQuery.data &&
                new Array(4)
                  .fill(0)
                  .map((_, idx) => <LoadingNoteConfigCard key={idx} />)}
              {!!noteQuery.data && (
                <>
                  <NoteConfigCard
                    title="Preferred Length"
                    content={noteQuery.data.preferredLength}
                  />
                  {!!noteQuery.data.noteFormat && (
                    <NoteConfigCard
                      title="Note Format"
                      content={noteQuery.data.noteFormat}
                    />
                  )}
                  {!!noteQuery.data.noteSetting && (
                    <NoteConfigCard
                      title="Note Setting"
                      content={capitalizeFirstLetter(
                        noteQuery.data.noteSetting,
                      )}
                    />
                  )}

                  <NoteConfigCard
                    title="Created At"
                    content={new Date(noteQuery.data.createdAt).toDateString()}
                  />

                  {!!noteQuery.data?.customPrompt && (
                    <div className="col-span-full">
                      <NoteConfigCard
                        title="Custom Prompt"
                        content={noteQuery.data?.customPrompt}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <hr />
          <div className="md:container py-6 space-y-3">
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
                  strokeWidth="1.375"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
          <div className="md:container py-6 space-y-3">
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
                durationNumber={recording.data?.recording.duration ?? undefined}
                audioKey={recording.data?.recording.s3Key}
              />
            )}
          </div>
        </TabsContent>
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

type NoteConfigCardProps = {
  title: string;
  content: string;
};
const NoteConfigCard = (props: NoteConfigCardProps) => {
  return (
    <div className={`rounded-lg  p-2 space-y-1`}>
      <p className="text-sm text-slate-600">{props.title}</p>
      {props.content.length === 0 ? (
        <p className="italic text-gray-400 text-sm">Not provided</p>
      ) : (
        <p className="">{props.content}</p>
      )}
    </div>
  );
};

const LoadingNoteConfigCard = () => {
  return (
    <div className="bg-slate-100 rounded-lg  p-2 space-y-1 animate-pulse">
      <p className="text-sm text-transparent">.</p>
      <p className="italic text-transparent ">.</p>
    </div>
  );
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
