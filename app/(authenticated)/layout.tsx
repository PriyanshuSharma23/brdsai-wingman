import { BottomBar } from "@/components/bottom-bar";
import { Navbar } from "@/components/nav";
import { ReactNode } from "react";
import { Spacer } from "./spacer";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="">
      <Navbar />
      {children}
      <Spacer />
      <BottomBar />
    </main>
  );
}
