"use client";
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PageComponent() {
  const queryParams = useSearchParams();
  const patientID = queryParams.get("patientId")
  const RecordPage = dynamic(() => import("./record-page"), { ssr: false });

  return <RecordPage
    initialPatientId={patientID}
  />
}
