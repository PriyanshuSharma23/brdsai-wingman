import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export type TagNames = "h1" | "h2" | "p";
type Block = {
  content: string;
  tagName: TagNames;
};

export function DummyBlock({ block }: { block: Block }) {
  return (
    <article
      className={cn(
        " group flex flex-1 items-center gap-2 overflow-visible rounded-sm  py-[2px] pl-1 pr-2 transition-shadow  focus-within:shadow-[0_0px_0px_1px_rgba(0,0,0,0)]"
      )}
    >
      <div className="relative flex-1 overflow-hidden">
        <div
          className={cn(
            "block h-full w-full whitespace-pre-wrap break-words caret-primary/80 outline-none",
            getClassName(block.tagName)
          )}
          dangerouslySetInnerHTML={{
            __html: block.content,
          }}
        ></div>
      </div>
    </article>
  );
}

export function tagNameToDisplayName(tagName: string) {
  switch (tagName) {
    case "h1":
      return "Heading 1";
    case "h2":
      return "Heading 2";
    case "h3":
      return "Heading 3";
    default:
      return "Paragraph";
  }
}

export function getClassName(tagName: string) {
  switch (tagName) {
    case "h1":
      return "text-2xl font-semibold tracking-tight lg:text-3xl text-slate-600";
    case "h2":
      return "text-xl font-semibold tracking-tight transition-colors first:mt-0 text-slate-600";
    case "h3":
      return "text-lg font-semibold tracking-tight text-slate-600";
    case "p":
      return "w-full text-slate-700";

    default:
      return "";
  }
}

interface CopyButtonProps {
  focused: boolean;
  block: Block;
}

export const getInnerText = (content: string) => {
  let d = document.createElement("div"); // to get the text content of spans
  d.innerHTML = content;
  return d.innerText;
};

export const CopyButton = ({ focused, block }: CopyButtonProps) => {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      className={`pointer-events-none ml-auto opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 ${
        focused ? "opacity-100" : ""
      }`}
      onClick={() => {
        setClicked(true);
        if (window.navigator.clipboard)
          window.navigator.clipboard.writeText(getInnerText(block.content));
        setTimeout(() => {
          setClicked(false);
        }, 1000);
      }}
    >
      {clicked ? (
        <Check size="16px" className="text-green-500" />
      ) : (
        <Copy size="16px" />
      )}
    </button>
  );
};
