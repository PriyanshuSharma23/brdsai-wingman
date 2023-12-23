import { RefObject } from "react";

interface ProgresProps {
  /**
   * value: number between 1 and 100 (inclusive)
   */
  value: number;
  onChange?: (val: number) => void;
  progressbarRef: RefObject<HTMLInputElement>;
  duration: number;
}

export const Progress = ({ value, progressbarRef }: ProgresProps) => {
  return (
    // <div
    //   className="relative h-2 rounded-full bg-slate-100/50 w-full"
    //   onClick={(e) => {
    //   }}
    // >
    //   <div
    //     className="h-4 w-4 rounded-full bg-blu absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
    //     style={{
    //       left: `${value}%`,
    //     }}
    //   ></div>
    //   <div
    //     className="h-2 absolute left-0 top-0 rounded-l-full bg-blu"
    //     style={{
    //       width: `${value}%`,
    //     }}
    //   ></div>
    // </div>
    <input type="range" ref={progressbarRef} value={10}/>
  );
};
