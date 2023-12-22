import { User } from "lucide-react";
import Link from "next/link";

type PatientCardProps = {
  name: string;
  mrn: string;
};

export const PatientCard = (props: PatientCardProps) => {
  return (
    <Link href={`/patients/${props.mrn}`} className="block">
      <div className="space-y-2 p-3 border rounded-md">
        <div className="flex text-primary items-center gap-1">
          <User size={18}/>
          <p>{props.name}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-400">{props.mrn}</p>
        </div>
      </div>
    </Link>
  );
};
