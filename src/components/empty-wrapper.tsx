import Image from "next/image";
import { ReactNode } from "react";

export const EmptyWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="">
      <Image
        src={"/onboarding-fig-2.png"}
        alt="onboarding figure 2"
        width={245.5}
        height={180.7}
        className={`${"top-8"} md:bottom-10 right-0  fixed -z-50 max-w-md`}
        priority
      />
      <Image
        src={"/onboarding-fig-1.png"}
        alt="onboarding figure 1"
        width={290}
        height={343}
        className={`w-3/4 bottom-0 left-0   fixed -z-50 max-w-md `}
        priority
      />
      {children}
    </div>
  );
};
