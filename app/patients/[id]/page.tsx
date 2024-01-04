"use client";
import { usePatientQuery } from "@/queries/patient/patient-query";
import { ActionsNav } from "../../recordings/recording-nav";
import { ChevronDown, ChevronUp, Mic } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useState } from "react";
import { Note } from "@/components/svgs/note";
import { useRouter } from "next/navigation";
import { NoteCard } from "@/components/note-card";
import { useNotesByPatient } from "@/queries/recording/notes-by-patient";
import { useRecordingsByPatient } from "@/queries/recording/recordings-by-patient-id-query";
import { AudioCard } from "@/components/audio-card";
import { LoadingCard } from "@/components/loading-card";
import { createAudioSourceFromKey, parseTimestamp } from "@/lib/utils";
import { useAudioPlayerState } from "@/state/global-audio-player";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { AUDIO_PLAYER_HEIGHT } from "@/lib/constants";

type PatientPageProps = {
  params: {
    id: string;
  };
};
const PatientPage = ({ params }: PatientPageProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const patientQuery = usePatientQuery({
    patientId: Number(params.id),
  });

  const recordingsQuery = useRecordingsByPatient({
    patientId: Number(params.id),
  });

  const router = useRouter();
  const notesQuery = useNotesByPatient({
    patientId: Number(params.id),
  });
  const {
    visible,
    setVisible,
    setAudios3Key: setAudioSource,
    audioS3Key: audioSource,
  } = useAudioPlayerState();

  return (
    <main>
      <ActionsNav
        resourceName="patient"
        name={!!patientQuery.data ? patientQuery.data.name : "Loading..."}
        onEdit={function (newName: string): void {}}
        onDelete={function (): void {}}
      />

      <div className="pt-6 ">
        <div className="px-4 md:px-16">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2 "
          >
            <div className="flex items-center justify-between ">
              <div className="flex gap-2 items-center text-md text-neutral-600 ">
                <Mic size={18} />
                <p>
                  Recordings for{" "}
                  <span className="text-blu">
                    {patientQuery.data?.name ?? "---"}
                  </span>
                </p>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="lg" className="w-9 p-0">
                  {isOpen ? (
                    <ChevronUp className="text-gray-400" size={20} />
                  ) : (
                    <ChevronDown className=" text-gray-400" size={20} />
                  )}
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              {recordingsQuery.isLoading &&
                new Array(5).fill(0).map((_, i) => {
                  return <LoadingCard key={i} />;
                })}

              {
                !!recordingsQuery.data && recordingsQuery.data.length === 0 && 
                  <p>No recordings</p>
              }

              {!!recordingsQuery.data &&
                recordingsQuery.data.map((recording) => {
                  return (
                    <AudioCard
                      id={recording.id}
                      key={recording.id}
                      name={recording.recordingName}
                      recordedBy={patientQuery.data?.name ?? "---"}
                      duration={
                        recording.duration
                          ? parseTimestamp(recording.duration, 2)
                          : "--:--"
                      }
                      durationNumber={recording.duration ?? undefined}
                      audioKey={recording.s3Key}
                    />
                  );
                })}
            </CollapsibleContent>
          </Collapsible>

          <Button
            className="w-full max-w-sm rounded-full mt-4"
            onClick={() => router.push("/record")}
          >
            + New Recording
          </Button>
        </div>

        <hr className="my-4 " />

        <div className="px-4 md:px-16">
          <div className="flex gap-2 items-center text-md text-neutral-600 pt-4">
            <Note className="w-5" />
            <p>
              Notes for{" "}
              <span className="text-blu">
                {patientQuery.data?.name ?? "---"}
              </span>
            </p>
          </div>
          <div className="py-4 flex flex-col gap-2">
            {notesQuery.data?.map((note) => (
              <NoteCard
                key={note.id}
                name={note.title ?? "Unnamed note"}
                // date in DD/MM/YYYY
                date={new Date(note.createdAt).toLocaleDateString("en-US")}
                format={note.noteFormat}
                noteId={note.id}
              />
            ))}
          </div>
        </div>
      </div>
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
};
export default PatientPage;
