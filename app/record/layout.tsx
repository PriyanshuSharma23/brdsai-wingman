import { ReactNode } from "react";
import { RecordNav } from "./record-nav";

type RecordLayoutProps = {
  children: ReactNode;
};

const RecordLayout = (props: RecordLayoutProps) => {
  return (
    <main className="flex flex-col items-stretch h-screen overflow-hidden">
      <RecordNav />
      {props.children}
    </main>
  );
};

export default RecordLayout;
