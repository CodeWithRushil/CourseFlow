import React from "react";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, ChevronRight } from "lucide-react";

function unescapeCode(text) {
  let value = String(text ?? "").trim();
  if (!value) return "";
  if (value.includes("\\n") || value.includes("\\t")) {
    value = value
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  return value
    .replace(/^```[\w+-]*\s*\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim();
}

function extractCodeFromExplanation(explanation) {
  const text = String(explanation || "");
  const match = text.match(/```[\w+-]*\s*\n?([\s\S]*?)```/);
  return match ? unescapeCode(match[1]) : "";
}

function stripFencedCodeFromExplanation(explanation) {
  return String(explanation || "")
    .replace(/```[\w+-]*\s*\n?[\s\S]*?```/g, "")
    .trim();
}

function getSectionCode(item) {
  const raw = item?.code ?? item?.Code ?? item?.snippet ?? "";
  let code = "";
  if (Array.isArray(raw)) {
    code = raw.map((line) => String(line ?? "")).join("\n");
  } else if (typeof raw === "object" && raw !== null) {
    code = String(raw.code ?? raw.content ?? raw.text ?? "");
  } else {
    code = String(raw);
  }
  code = unescapeCode(code);
  if (!code) {
    code = extractCodeFromExplanation(item?.explanation);
  }
  return code;
}

const ChapterContent = ({
  chapter,
  includeVideo,
  content,
  chapterIndex = 0,
  chapterCount = 1,
  onPrev,
  onNext,
  isFirst = true,
  isLast = false,
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  const handleCopy = async (code, index) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="px-1 sm:px-4 md:px-9 py-5 sm:py-7 max-w-[920px] mx-auto">
      <div className="mb-4 sm:mb-5">
        <p className="m-0 mb-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#155DFC]">
          Chapter {chapterIndex + 1} of {chapterCount}
        </p>
        <h2 className="font-bold text-xl sm:text-2xl md:text-[28px] text-[#1c1d1f] tracking-tight leading-snug mb-2">
          {chapter?.chapterName}
        </h2>
        {chapter?.about ? (
          <p className="text-[#4b5563] text-sm sm:text-base leading-relaxed m-0">
            {chapter.about}
          </p>
        ) : null}
      </div>

      {includeVideo && content?.videoId && (
        <div className="mb-5 sm:mb-6 -mx-1 sm:mx-0">
          <div
            className="relative w-full rounded-lg sm:rounded-xl overflow-hidden bg-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.18)]"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              title={chapter?.chapterName || "Chapter video"}
              src={`https://www.youtube.com/embed/${content.videoId}?rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:gap-4">
        {content?.content?.map((item, index) => {
          const code = getSectionCode(item);
          const explanationText = code
            ? stripFencedCodeFromExplanation(item?.explanation)
            : item?.explanation;

          return (
            <article
              key={index}
              className="p-4 sm:p-6 bg-white border border-gray-200 mb-0 rounded-xl sm:rounded-[14px] shadow-[0_4px_14px_rgba(15,23,42,0.03)]"
            >
              <h3 className="font-bold text-base sm:text-xl mb-2.5 sm:mb-3 text-gray-900">
                {item?.title}
              </h3>

              {explanationText ? (
                <div className="text-[15px] sm:text-[16px] leading-[1.75] text-gray-700 whitespace-pre-wrap prose prose-slate max-w-none break-words">
                  <ReactMarkdown>{explanationText}</ReactMarkdown>
                </div>
              ) : null}

              {code ? (
                <div className="mt-3 sm:mt-4 rounded-[10px] overflow-hidden border border-slate-700">
                  <div className="flex items-center justify-between bg-slate-800 px-3 sm:px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                    </div>

                    <button
                      onClick={() => handleCopy(code, index)}
                      className="cursor-pointer text-xs font-medium px-2 py-1 rounded
            bg-slate-700 text-slate-100 hover:bg-slate-600 transition"
                    >
                      {copiedIndex === index ? "✓ Copied" : "Copy"}
                    </button>
                  </div>

                  <pre className="bg-slate-900 text-slate-100 p-3 sm:p-4 overflow-x-auto text-[12px] sm:text-[13px] leading-relaxed m-0">
                    <code className="font-mono whitespace-pre-wrap break-words text-slate-100">
                      {code}
                    </code>
                  </pre>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {(onPrev || onNext) && (
        <div className="mt-6 sm:mt-7 flex flex-col-reverse sm:flex-row justify-between gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 px-4 py-2.5 sm:px-[18px] sm:py-3 rounded-lg text-sm font-bold
              bg-white border border-gray-300 text-[#1c1d1f]
              hover:bg-gray-50 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 px-4 py-2.5 sm:px-[18px] sm:py-3 rounded-lg text-sm font-bold
              bg-[#155DFC] text-white hover:bg-blue-700 cursor-pointer"
          >
            {isLast ? "Mark complete" : "Next lecture"}
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChapterContent;
