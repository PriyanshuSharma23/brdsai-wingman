import { ReactNode } from "react";

type RecordingPageParams = {
  children: ReactNode;
  params: {
    id: string;
  };
};

export default function RecordingsLayout(props: RecordingPageParams) {
  return <main className="flex flex-col ">{props.children}</main>;
}
