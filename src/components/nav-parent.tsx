import { ReactNode } from "react";

type NavWrapperProps = {
  children?: ReactNode;
};

export const NavWrapper = (props: NavWrapperProps) => {
  return (
    <nav className="bg-slate-100  shadow-md shadow-gray-200/60 sticky top-0 z-20">
      <div className="flex justify-between  p-4 container">
        {props.children}
      </div>
    </nav>
  );
};