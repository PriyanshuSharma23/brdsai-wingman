import { ChipCard } from "./chip-card";

export const LoadingCard = () => {
  return (
    <ChipCard
      title={<span className="w-16 h-4 bg-gray-200 animate-pulse block"></span>}
      content={<span className="w-28 h-4 bg-gray-200 animate-pulse block"></span>}
      titleIcon={<span className="w-2 h-4 bg-gray-200 animate-pulse block"></span>}
    ></ChipCard>
  );
};
