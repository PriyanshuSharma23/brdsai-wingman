"use client";
import { SearchIconInput } from "@/components/ui/icon-input";
import { ArrowRight, ChevronDown, ChevronUp, Plus, Search } from "lucide-react";
import { TranscriptSegment } from "./transcript-segment";
import { useRecordingQuery } from "@/queries/recording/recording-query";
import { useTranscriptByRecordingQuery } from "@/queries/transcript/transcript-by-recording-id-query";
import AudioPlayer, { useAudioPlayer } from "@/components/audio/AudioPlayer";
import { createAudioSourceFromKey } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ActionsNav } from "../recording-nav";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Note } from "@/components/svgs/note";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChipCard } from "@/components/chip-card";
import Link from "next/link";
import { CreateNewNote } from "./create-new-note";

type RecordingPageParams = {
  params: {
    id: string;
  };
};

export default function RecordingsPage(params: RecordingPageParams) {
  const recordingQuery = useRecordingQuery({
    recordingId: Number(params.params.id),
  });

  console.log(recordingQuery.data);
  const [createNewNoteOpen, setCreateNewNoteOpen] = useState(false);

  const transcriptQuery = useTranscriptByRecordingQuery({
    recordingId: Number(params.params.id),
  });

  const key = recordingQuery.data?.recording.s3Key;
  console.log(createAudioSourceFromKey(key ?? ""));

  const [isOpen, setIsOpen] = useState(false);
  const loadWithDuration = useAudioPlayer((s) => s.loadWithDuration);
  const seekAndPlay = useAudioPlayer((s) => s.seekAndPlay);
  const timeProgress = useAudioPlayer((s) => s.timeProgress);

  useEffect(() => {
    loadWithDuration(Number(recordingQuery.data?.recording.duration));
  }, [recordingQuery.data, loadWithDuration]);

  const isActive = (timestamp: number, start: number, end: number) => {
    return timestamp >= start && timestamp <= end;
  };

  return (
    <>
      <ActionsNav
        resourceName="recording"
        fallbackBackRoute="/recordings"
        name={recordingQuery.data?.recording.recordingName ?? "Loading..."}
        onEdit={function (newName: string): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <Tabs defaultValue="overview">
        <div className="">
          <TabsList className="grid w-full grid-cols-2 bg-white ">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b data-[state=active]:text-blu data-[state=active]:border-b-blu/70 data-[state=active]:border-b-2 text-md font-normal"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="transcript"
              className="rounded-none border-b data-[state=active]:text-blu data-[state=active]:border-b-blu/70 data-[state=active]:border-b-2 text-md font-normal"
            >
              Transcript
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <div className="px-4 md:px-16 py-6 border-b">
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
              <p>Associated Patient</p>
            </div>
            <div className="pt-2"></div>
            <Link href={"/patients/" + recordingQuery.data?.patient.id}>
              <div className="relative">
                <ChipCard
                  title={recordingQuery.data?.patient.name ?? "---"}
                  content={recordingQuery.data?.patient.uniqueId ?? "---"}
                  contnetIcon={<div></div>}
                />

                <svg
                  width="23"
                  height="18"
                  viewBox="0 0 23 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-1/2 -translate-y-1/2 right-6"
                >
                  <path
                    d="M22 9L1 8.99999M22 9L14.125 16.875M22 9L14.125 1.125"
                    stroke="#035879"
                    strokeWidth="1.96875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
            <div className="pt-2"></div>
          </div>

          <div className="px-4 md:px-16 pt-4">
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="space-y-2 "
            >
              <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center text-md text-neutral-600 ">
                  <Note className="w-5" />
                  <p>Notes from recording</p>
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
              <CollapsibleContent className="space-y-2"></CollapsibleContent>
            </Collapsible>
          </div>
        </TabsContent>
        <TabsContent value="transcript">
          <div className="container space-y-2 md:space-y-4 sticky top-20 bg-white">
            <h1 className="text-lg pt-5" style={{ fontWeight: 500 }}>
              Transcription
            </h1>
            <SearchIconInput
              icon={<Search size={16} className="stroke-gray-400" />}
              placeholder="Search keywords"
            />
          </div>

          <div className="container space-y-4 py-6 flex-1">
            {transcriptQuery.data?.segments?.map((transcriptSegment) => (
              <TranscriptSegment
                timestamp={Number(transcriptSegment.start)}
                transcript={transcriptSegment.text}
                timeSegments={2}
                key={transcriptSegment.start}
                active={isActive(
                  timeProgress,
                  Number(transcriptSegment.start),
                  Number(transcriptSegment.end),
                )}
                onClick={() => {
                  console.log("seeking");
                  seekAndPlay(Number(transcriptSegment.start));
                }}
              />
            ))}
          </div>

          <div className="pt-32"></div>
        </TabsContent>
      </Tabs>

      <div className="w-full bg-white py-6 fixed bottom-0 inset-x-0 border-t ">
        <div className="pb-4 w-full bg-white border-b px-4 gap-2 grid place-content-stretch">
          <Button
            className="w-full rounded-full max-w-lg mx-auto"
            onClick={() => setCreateNewNoteOpen(true)}
          >
            New note from recording
            <Plus size={18} className="ml-2" />
          </Button>
        </div>
        <div className="px-4 pt-4">
          <AudioPlayer
            source={key ? createAudioSourceFromKey(key) : ""}
            disabled={!key}
          />
        </div>
      </div>
      <CreateNewNote
        open={!!recordingQuery.data && createNewNoteOpen}
        onOpenChange={setCreateNewNoteOpen}
        closeWindow={() => setCreateNewNoteOpen(false)}
        recordingName={recordingQuery.data?.recording.recordingName ?? "---"}
        recordingId={Number(params.params.id)}
      />
    </>
  );
}

function countTimesegments(timestamp: number): 2 | 3 {
  if (timestamp >= 3600) {
    return 3;
  } else {
    return 2;
  }
}
