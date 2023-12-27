import { ActionButton } from "@/components/action-button";
import { EmptyWrapper } from "@/components/empty-wrapper";
import { Button } from "@/components/ui/button";
import { Mic, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const EmptyRecordings = () => {
  const router = useRouter();

  const action = () => {
    router.push("/record");
  };

  return (
    <EmptyWrapper>
      <div className="  fixed inset-0 grid place-content-center ">
        <div className="flex flex-col items-center justify-center text-gray-400 gap-3">
          <Mic size={32} className="" />
          <p className="max-w-[24ch] text-center text-lg">
            You haven’t added any recordings yet.
          </p>
          <div className="py-1"></div>
          <Button
            className="rounded-full w-full max-w-sm gap-3"
            onClick={action}
          >
            <p>New Recording</p>
            <Plus size={20} />
          </Button>
        </div>
      </div>
      <ActionButton onClick={action} />
    </EmptyWrapper>
  );
};
