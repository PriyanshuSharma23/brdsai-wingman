import { Button } from "@/components/ui/button";
import { SearchIconInput } from "@/components/ui/icon-input";
import { Search, SlidersHorizontal } from "lucide-react";
import { PatientCard } from "./patient-card";

const patient = (
  <svg
    viewBox="0 0 39 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 mb-1"
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

const PatientsPage = () => {
  return (
    <div className="px-4 md:px-12 xl:px-20 space-y-2 md:space-y-4 text-neutral-600 pt-6">
      <h1
        className="text-lg pt-5 flex items-center gap-2"
        style={{ fontWeight: 500 }}
      >
        {patient}
        <span>Your Patients</span>
      </h1>

      <div className="flex max-w-md items-center gap-2">
        <div className="flex-1">
          <SearchIconInput
            icon={<Search size={16} className="stroke-gray-400" />}
            className="w-full flex-1"
          />
        </div>
        <Button className="w-11 ">
          <SlidersHorizontal className="flex-shrink-0" size={19} />
        </Button>
      </div>

      <div className="space-y-3  py-5">
        {new Array(50).fill(1).map((_, i) => (
          <PatientCard name="Naman Dureja" mrn="MRN-5632-8975" key={i} />
        ))}
      </div>
    </div>
  );
};

export default PatientsPage;
