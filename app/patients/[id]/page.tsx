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

type PatientPageProps = {
  params: {
    id: string;
  };
};
const PatientPage = ({ params }: PatientPageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const patientQuery = usePatientQuery({
    patientId: Number(params.id),
  });

  const router = useRouter();

  return (
    <main>
      <ActionsNav
        resourceName="patient"
        name={!!patientQuery.data ? patientQuery.data.name : "Loading..."}
        onEdit={function (newName: string): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (): void {
          throw new Error("Function not implemented.");
        }}
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
            <CollapsibleContent className="space-y-2"></CollapsibleContent>
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
        </div>
      </div>
    </main>
  );
};
export default PatientPage;
