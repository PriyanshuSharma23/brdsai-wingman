import { BottomBar } from "@/components/bottom-bar";
import { Navbar } from "@/components/nav";
import { ReactNode } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      {children}
      <BottomBar />
    </main>
  );
}
