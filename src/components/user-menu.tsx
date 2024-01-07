"use client";

import { useStore } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

type UserMenuProps = {};
export const UserMenu = (props: UserMenuProps) => {
  const logout = useStore((s) => s.logout);
  const user = useStore((s) => s.user);

  const router = useRouter();

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setUserName(user?.fullName ?? null);
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center border rounded-full gap-2 px-1 pl-2  py-1">
        <Menu size={18} />
        {!!userName ? (
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.imagePath ?? undefined} />
            <AvatarFallback className="bg-blu text-white">
              {userName[0]}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-8 w-8 bg-gray-400/70 animate-pulse rounded-full"></div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4 ">
        <DropdownMenuLabel className="font-normal text-sm text-gray-500">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-400" onClick={() => {
          logout();
          router.replace("/auth")
        }}>
          Log Out <LogOut size={18} className="ml-2" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
