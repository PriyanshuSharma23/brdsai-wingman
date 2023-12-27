"use client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavWrapper } from "./nav-parent";
import { useStore } from "@/store/store";
import ClientOnly from "./client-only";

export const Navbar = () => {
  const { user } = useStore();
  return (
    <ClientOnly>
      <NavWrapper>
        <Image
          src={"/Logo-small.png"}
          alt="brds"
          width={273}
          height={78}
          className="w-36"
          priority
        />
        <Avatar>
          {!!user ? (
            <AvatarFallback
              className="rounded-full bg-gray-100 border"
              key={"loaded"}
            >
              {user.fullName?.[0]}
            </AvatarFallback>
          ) : (
            <AvatarFallback
              className="rounded-full bg-gray-100 border w-12 h-12"
              key={"loading"}
            ></AvatarFallback>
          )}
        </Avatar>
      </NavWrapper>
    </ClientOnly>
  );
};
// <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
