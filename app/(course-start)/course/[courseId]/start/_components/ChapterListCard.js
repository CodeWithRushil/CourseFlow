import React from "react";
import { LuClock4 } from "react-icons/lu";

const ChapterListCard = ({ chapter, index, isDone = false }) => {
  return (
    <div className="flex flex-col gap-0.5 py-1">
      <span className="text-[11px] font-bold tracking-wide uppercase text-slate-500">
        Chapter {index + 1}
      </span>
      <h2
        className={`font-semibold text-sm leading-snug ${
          isDone ? "text-slate-600" : "text-slate-900"
        }`}
      >
        {chapter.chapterName}
      </h2>
      {chapter.duration ? (
        <h2 className="font-medium text-[#155DFC] flex gap-1 items-center text-xs">
          <LuClock4 className="text-[#155DFC] text-sm" />
          {chapter.duration}
        </h2>
      ) : null}
    </div>
  );
};

export default ChapterListCard;
