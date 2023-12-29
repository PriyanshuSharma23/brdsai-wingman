"use client";
import dynamic from "next/dynamic"

export default function PageComponent() {
  const RecordPage = dynamic(() => import("./page2"), { ssr: false });

  return <RecordPage />
}
