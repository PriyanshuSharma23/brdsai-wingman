"use client";
import { Button } from "@/components/ui/button";
import { PatientCard } from "./patients/patient-card";
import { ArrowRight, Mic, PlusIcon } from "lucide-react";
import { ChipCard } from "@/components/chip-card";
import { Note } from "@/components/svgs/note";
import { useAllPatientQuery } from "@/queries/patient/all-patients-query";
import Link from "next/link";
import { useAllRecordingsQuery } from "@/queries/recording/recordings-query";
import Image from "next/image";
import { useStore } from "@/store/store";
import ClientOnly from "@/components/client-only";
import { LoadingCard } from "@/components/loading-card";

export default function Home() {
  const patientsQuery = useAllPatientQuery();
  const patients = patientsQuery.data?.slice(0, 5);

  const recordingsQuery = useAllRecordingsQuery();
  const recordings = recordingsQuery.data?.slice(0, 5);

  const name = useStore((s) => s.user?.fullName);

  return (
    <>
      <div className="px-4 md:px-12 xl:px-20 space-y-2 md:space-y-4 text-neutral-600 pt-6">
        <h1 className="text-blu text-2xl font-semibold flex gap-1 h-8">
          <ClientOnly>Hi, {name}</ClientOnly>
        </h1>

        <div className="flex gap-2 items-center text-lg text-neutral-600 pt-4">
          {patient}
          <p>Recent Patients</p>
        </div>

        <div className="flex gap-2 overflow-x-scroll no-scrollbar">
          {!patients &&
            new Array(3).fill(0).map((_, i) => <LoadingCard key={i} />)}
          {patients?.map((patient, idx) => {
            return (
              <div className="min-w-[12rem]" key={patient.id}>
                <PatientCard
                  name={patient.name}
                  mrn={patient.uniqueId}
                  id={patient.id}
                />
              </div>
            );
          })}
        </div>

        <div className=""></div>

        <Link href="/patients">
          <Button className="rounded-full  px-10 w-full max-w-sm gap-1">
            <span>
              View full list {!!patients && `(${patientsQuery.data?.length})`}
            </span>
            <ArrowRight className="" size={16} />
          </Button>
        </Link>

        <div className="py-3 border-b border-gray-400/50"></div>

        <div className="flex gap-2 items-center text-lg text-neutral-600 pt-4">
          <Mic size={21} />
          <p>
            Recordings{" "}
            {recordingsQuery.data && `(${recordingsQuery.data?.length})`}
          </p>
        </div>

        <div className="flex gap-2 overflow-x-scroll no-scrollbar">
          {!recordings &&
            new Array(3).fill(0).map((_, i) => <LoadingCard key={i} />)}
          {recordings?.map((recording, idx) => {
            return (
              <Link
                href={`/recordings/${recording.recording.id}`}
                key={recording.recording.id}
              >
                <div className="min-w-[12rem]" key={idx}>
                  <ChipCard
                    titleIcon={<Mic size={15} />}
                    title={recording.recording.recordingName}
                    contentIcon={patient}
                    content={recording.patient.name}
                  />
                </div>
              </Link>
            );
          })}
        </div>
        <div className=""></div>

        <Link href={"/record"}>
          <Button className="rounded-full  px-10 w-full max-w-sm gap-1">
            <span>New Recording</span>
            <PlusIcon size={18} />
          </Button>
        </Link>

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
                  contentIcon={<Mic size={16} />}
                  content="Recording Name"
                  key={idx}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Image
        src={"/onboarding-fig-1.png"}
        alt="onboarding figure 1"
        width={290}
        height={343}
        className={`w-3/4 bottom-0 left-0   fixed -z-50 max-w-md opacity-50`}
        priority
      />
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
