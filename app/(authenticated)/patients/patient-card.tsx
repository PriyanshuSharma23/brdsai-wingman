import { ChipCard } from "@/components/chip-card";
import Link from "next/link";

type PatientCardProps = {
  id: number;
  name: string;
  mrn: string;
};

export const PatientCard = (props: PatientCardProps) => {
  return (
    <Link href={`/patients/${props.id}`} className="block">
      <ChipCard
        title={props.name}
        content={props.mrn}
        titleIcon={
          <svg
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 -translate-y-[1px]"
          >
            <path
              d="M12 11.25H6C4.34315 11.25 3 12.5931 3 14.25V15.75H15V14.25C15 12.5931 13.6569 11.25 12 11.25Z"
              stroke="#035879"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
              stroke="#035879"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </Link>
  );
};
