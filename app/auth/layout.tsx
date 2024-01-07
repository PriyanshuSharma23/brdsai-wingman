import { ReactNode } from "react";

export default function AuthLayout({ children }: {children: ReactNode}) {
  return <main className="relative flex flex-col justify-center items-center space-y-8 h-screen py-[3.5rem] overflow-y-scroll">
    { children }
  </main>
}

