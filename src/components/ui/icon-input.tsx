import { cn } from "@/lib/utils";
import { Input } from "./input";

export function SearchIconInput({
  icon,
  className,
  value,
  onChange,
  ...props
}: any) {
  return (
    <div className="group relative">
      <span className="absolute left-3 top-3 transition-opacity group-focus-within:pointer-events-none group-focus-within:opacity-0">
        {icon}
      </span>
      <Input
        type="text"
        placeholder="Notes"
        className={cn(
          "bg-white pl-9  pr-3 transition-opacity placeholder:ml-3 placeholder:text-slate-500 group-focus-within:pl-3 group-focus-within:placeholder:opacity-0",
          className
        )}
        onChange={onChange}
        {...props}
      ></Input>
    </div>
  );
}
