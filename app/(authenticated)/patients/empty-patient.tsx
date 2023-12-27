import { ActionButton } from "@/components/action-button";
import { EmptyWrapper } from "@/components/empty-wrapper";
import { AddPatientModal } from "@/components/patient-modal";
import { Button } from "@/components/ui/button";
import { Mic, Plus } from "lucide-react";
import { useState } from "react";

export const EmptyPatients = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const addPatient = () => {
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <EmptyWrapper>
      <div className="  fixed inset-0 grid place-content-center ">
        <div className="flex flex-col items-center justify-center text-gray-400 gap-3">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 17V27M35 22H45M16 30H32C36.4183 30 40 33.5817 40 38V42H8V38C8 33.5817 11.5817 30 16 30ZM32 14C32 18.4183 28.4183 22 24 22C19.5817 22 16 18.4183 16 14C16 9.58172 19.5817 6 24 6C28.4183 6 32 9.58172 32 14Z"
              stroke="#7B7B7B"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="max-w-[24ch] text-center text-lg">
            You haven’t added any patients yet.
          </p>
          <div className="py-1"></div>
          <Button
            className="rounded-full w-full max-w-sm gap-3"
            onClick={addPatient}
          >
            <p>New Patient</p>
            <Plus size={20} />
          </Button>
        </div>
      </div>
      <ActionButton onClick={addPatient} />
      <AddPatientModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        closeModal={closeModal}
      />
    </EmptyWrapper>
  );
};
