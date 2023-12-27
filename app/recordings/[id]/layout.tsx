"use client";
import { ReactNode } from "react";
import { ActionsNav } from "../recording-nav";
import AudioPlayer from "@/components/audio/AudioPlayer";

type RecordingPageParams = {
  children: ReactNode;
  params: {
    id: string;
  };
};

export default function RecordingsLayout(props: RecordingPageParams) {
  return (
    <main className="flex flex-col ">
      <ActionsNav
        resourceName="recording"
        name={"Consultation with Naman"}
        onEdit={function (newName: string): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      {props.children}
    </main>
  );
}
