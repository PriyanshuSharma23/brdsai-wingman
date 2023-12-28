import Link from "next/link";
import { ChipCard } from "./chip-card";

export const ArrowPatientCard = ({
  name,
  uniqueId,
  patientId,
}: {
  name?: string;
  uniqueId?: string;
  patientId?: string;
}) => {
  return (
    <Link href={"/patients/" + patientId}>
      <div className="relative max-w-md">
        <ChipCard
          title={name ?? "---"}
          content={uniqueId ?? <span className="italic">No MRN provided</span>}
          contentIcon={<div></div>}
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
  );
};
