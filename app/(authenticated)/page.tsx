import { Button } from "@/components/ui/button";
import { PatientCard } from "./patients/patient-card";
import { ArrowRight, Mic, PlusIcon } from "lucide-react";
import { ChipCard } from "@/components/chip-card";

export default function Home() {
  return (
    <>
      <div className="px-4 md:px-12 xl:px-20 space-y-2 md:space-y-4 text-neutral-600 pt-6">
        <h1 className="text-blu text-2xl font-semibold">Hi, Naman</h1>

        <div className="flex gap-2 items-center text-lg text-neutral-600 pt-4">
          {patient}
          <p>Recent Patients</p>
        </div>

        <div className="flex gap-2 overflow-x-scroll no-scrollbar">
          {new Array(10).fill(0).map((_, idx) => {
            return (
              <div className="min-w-[12rem]" key={idx}>
                <PatientCard name={"Adnan"} mrn={"MRN-5632-8975"} id={1} />
              </div>
            );
          })}
        </div>

        <div className=""></div>

        <Button className="rounded-full  px-10 w-full max-w-sm gap-1">
          <span>View full list (42)</span>
          <ArrowRight className="" size={16} />
        </Button>

        <div className="py-3 border-b border-gray-400/50"></div>

        <div className="flex gap-2 items-center text-lg text-neutral-600 pt-4">
          <Mic size={21} />
          <p>Recordings (42)</p>
        </div>

        <div className="flex gap-2 overflow-x-scroll no-scrollbar">
          {new Array(10).fill(0).map((_, idx) => {
            return (
              <div className="min-w-[12rem]" key={idx}>
                <ChipCard
                  titleIcon={<Mic size={15} />}
                  title="05/23/2023 - Patient"
                  contnetIcon={patient}
                  content="Naman Dureja"
                />
              </div>
            );
          })}
        </div>
        <div className=""></div>

        <Button className="rounded-full  px-10 w-full max-w-sm gap-1">
          <span>New Recording</span>
          <PlusIcon size={18} />
        </Button>

        <div className="py-3 border-b border-gray-400/50"></div>

        <div className="flex gap-2 items-center text-lg text-neutral-600 pt-4">
          <Note className="w-6" />
          <p>Notes (42)</p>
        </div>
        <div className="flex gap-2 overflow-x-scroll no-scrollbar">
          {new Array(10).fill(0).map((_, idx) => {
            return (
              <div className="min-w-[12rem]" key={idx}>
                <ChipCard
                  titleIcon={<Note className={"w-5"} />}
                  title="Note Name"
                  contnetIcon={<Mic size={16} />}
                  content="Recording Name"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const patient = (
  <svg
    viewBox="0 0 39 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 mb-1"
    stroke="currentColor"
  >
    <path
      d="M29.0442 23.334V21.7716C29.0442 18.3199 26.1953 15.5218 22.6809 15.5218H16.3175C12.8032 15.5218 9.95419 18.3199 9.95419 21.7716V23.334M36.9984 23.334V21.7716C36.9984 18.3199 34.1495 15.5218 30.6351 15.5218H29.8397M2 23.334V21.7716C2 18.3199 4.84897 15.5218 8.36335 15.5218H9.15877M27.4534 10.8345C30.0892 10.8345 32.2259 8.73597 32.2259 6.14725C32.2259 3.55853 30.0892 1.45996 27.4534 1.45996M11.545 10.8345C8.90924 10.8345 6.77251 8.73597 6.77251 6.14725C6.77251 3.55853 8.90924 1.45996 11.545 1.45996M24.2717 6.14725C24.2717 8.73597 22.135 10.8345 19.4992 10.8345C16.8634 10.8345 14.7267 8.73597 14.7267 6.14725C14.7267 3.55853 16.8634 1.45996 19.4992 1.45996C22.135 1.45996 24.2717 3.55853 24.2717 6.14725Z"
      strokeWidth="2.21282"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type NoteProps = {
  className?: string;
};
const Note = (props: NoteProps) => {
  return (
    <svg
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M5.20898 3.37109V2.46177C4.70678 2.46177 4.29966 2.86889 4.29966 3.37109H5.20898ZM19.7923 22.1211V23.0304C20.2945 23.0304 20.7016 22.6233 20.7016 22.1211H19.7923ZM5.20898 22.1211H4.29966C4.29966 22.6233 4.70678 23.0304 5.20898 23.0304V22.1211ZM14.584 3.37109L15.227 2.7281C15.0564 2.55757 14.8252 2.46177 14.584 2.46177V3.37109ZM19.7923 8.57943H20.7016C20.7016 8.33826 20.6058 8.10697 20.4353 7.93643L19.7923 8.57943ZM8.33398 17.0451C7.83178 17.0451 7.42466 17.4522 7.42466 17.9544C7.42466 18.4566 7.83178 18.8638 8.33398 18.8638V17.0451ZM16.6673 18.8638C17.1695 18.8638 17.5766 18.4566 17.5766 17.9544C17.5766 17.4522 17.1695 17.0451 16.6673 17.0451V18.8638ZM8.33398 12.8784C7.83178 12.8784 7.42466 13.2856 7.42466 13.7878C7.42466 14.29 7.83178 14.6971 8.33398 14.6971V12.8784ZM14.584 14.6971C15.0862 14.6971 15.4933 14.29 15.4933 13.7878C15.4933 13.2856 15.0862 12.8784 14.584 12.8784V14.6971ZM19.7923 21.2118H5.20898V23.0304H19.7923V21.2118ZM6.11831 22.1211V3.37109H4.29966V22.1211H6.11831ZM5.20898 4.28042H14.584V2.46177H5.20898V4.28042ZM18.883 8.57943V22.1211H20.7016V8.57943H18.883ZM13.941 4.01409L19.1493 9.22242L20.4353 7.93643L15.227 2.7281L13.941 4.01409ZM12.633 3.37109V7.53776H14.4516V3.37109H12.633ZM15.6257 10.5304H19.7923V8.71177H15.6257V10.5304ZM12.633 7.53776C12.633 9.19056 13.9728 10.5304 15.6257 10.5304V8.71177C14.9773 8.71177 14.4516 8.18615 14.4516 7.53776H12.633ZM8.33398 18.8638H16.6673V17.0451H8.33398V18.8638ZM8.33398 14.6971H14.584V12.8784H8.33398V14.6971Z"
        fill="#525252"
      />
    </svg>
  );
};
