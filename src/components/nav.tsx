import Image from "next/image";
import { NavWrapper } from "./nav-parent";
import { UserMenu } from "./user-menu";

export const Navbar = () => {
  return (
    <NavWrapper>
      <Image
        src={"/Logo-small.png"}
        alt="brds"
        width={273}
        height={78}
        className="w-32 object-contain"
        priority
      />

      <UserMenu />
    </NavWrapper>
  );
};
