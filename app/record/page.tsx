"use client";
import dynamic from "next/dynamic"

export default function PageComponent() {
  const RecordPage = dynamic(() => import("./record-page"), { ssr: false });

  return <RecordPage />
}
