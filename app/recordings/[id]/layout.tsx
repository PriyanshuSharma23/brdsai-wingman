"use client";
import { ReactNode } from "react";
import { RecordingNav } from "../recording-nav";
import { Player } from "./player";

type RecordingPageParams = {
  children: ReactNode;
  params: {
    id: string;
  };
};

export default function RecordingsLayout(props: RecordingPageParams) {
  return (
    <main>
      <RecordingNav
        id={props.params.id}
        name={"Consultation with Naman"}
        onEdit={function (newName: string): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      {props.children}
      <Player />
    </main>
  );
}
