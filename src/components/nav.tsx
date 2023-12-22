import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavWrapper } from "./nav-parent";

export const Navbar = () => {
  return (
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
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </NavWrapper>
  );
};
