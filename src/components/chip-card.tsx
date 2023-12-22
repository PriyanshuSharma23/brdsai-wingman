import { ReactNode } from "react";

type ChipCardProps = {
  titleIcon?: ReactNode;
  title: ReactNode;
  contnetIcon?: ReactNode;
  content: ReactNode;
};

export const ChipCard = (props: ChipCardProps) => {
  return (
    <div className="space-y-2 p-3 border rounded-md">
      <div className="flex text-primary items-center gap-1 ">
        <div className="flex-shrink-0">{props.titleIcon}</div>
        <p className="line-clamp-1">{props.title}</p>
      </div>
      <div className="flex items-center gap-1">
        {props.contnetIcon}
        <p className="text-sm text-gray-400">{props.content}</p>
      </div>
    </div>
  );
};
