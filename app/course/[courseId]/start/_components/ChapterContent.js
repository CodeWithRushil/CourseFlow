import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";

const ChapterContent = ({ chapter, includeVideo, content }) => {
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  const handleCopy = async (code, index) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8 max-w-8xl mx-auto">
      {/* Chapter Title */}
      <h2 className="font-bold text-2xl sm:text-3xl text-gray-900 mb-2 text-center sm:text-left">
        {chapter?.chapterName}
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mb-6 text-center sm:text-left">
        {chapter?.about}
      </p>

      {/* 🎥 Responsive Video Section */}
      {includeVideo && content?.videoId && (
        <div className="my-8 flex justify-center">
          <div
            className="
        relative w-full aspect-video
        max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl
        rounded-xl overflow-hidden shadow-lg bg-black
      "
          >
            <YouTube
              videoId={content.videoId}
              opts={opts}
              className="absolute inset-0 w-full h-full"
              iframeClassName="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* 📘 Content Section */}
      <div>
        {content?.content?.map((item, index) => (
          <div
            key={index}
            className="p-4 sm:p-6 bg-sky-50 mb-8 rounded-xl shadow-sm"
          >
            <h2 className="font-semibold text-lg sm:text-xl mb-3 text-gray-900">
              {item?.title}
            </h2>

            <ReactMarkdown>{item?.explanation}</ReactMarkdown>

            {/* 💻 Improved Code Block */}
            {item?.code && (
              <div className="mt-6 rounded-lg overflow-hidden border border-slate-700">
                {/* Header */}
                <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
                  <span className="text-xs text-slate-300 font-mono">Code</span>

                  <button
                    onClick={() => handleCopy(item.code, index)}
                    className="cursor-pointer text-xs font-medium px-2 py-1 rounded
            bg-slate-700 text-slate-200 hover:bg-slate-600 transition"
                  >
                    {copiedIndex === index ? "✓ Copied" : "Copy"}
                  </button>
                </div>

                {/* Code */}
                <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm sm:text-base leading-relaxed">
                  <code className="font-mono whitespace-pre">{item.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
