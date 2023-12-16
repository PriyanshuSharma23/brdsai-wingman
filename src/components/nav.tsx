import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
  return (
    <nav className="bg-slate-100  shadow-md shadow-gray-200/60 sticky top-0 z-20">
      <div className="flex justify-between  p-4 container">
        <Image
          src={"/Logo.png"}
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
      </div>
    </nav>
  );
};
