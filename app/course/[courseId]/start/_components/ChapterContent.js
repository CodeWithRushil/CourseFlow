import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'

const ChapterContent = ({ chapter, includeVideo, content }) => {
  const opts = {
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8">
      {/* Chapter Title */}
      <h2 className="font-bold text-2xl sm:text-3xl text-gray-900 mb-2 text-center sm:text-left">
        {chapter?.chapterName}
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mb-6 text-center sm:text-left">
        {chapter?.about}
      </p>

      {/* Video Section || Fix this shit */}
      {includeVideo && (
        <div className="flex justify-center my-6">
          <div className="w-full max-w-3xl aspect-video">
            <YouTube videoId={content?.videoId} opts={opts} className="w-full h-full" />
          </div>
        </div>
      )}

      {/* Content Section */}
      <div>
        {content?.content?.map((item, index) => (
          <div
            key={index}
            className="p-4 sm:p-6 bg-sky-50 mb-6 rounded-lg mt-10 shadow-sm"
          >
            <h2 className="font-semibold text-lg sm:text-xl mb-3">{item?.title}</h2>
            <ReactMarkdown>
              {item?.explanation}
            </ReactMarkdown>

            {/* Code Block (with horizontal scroll) */}
            {item?.code && (
              <div className="p-4 bg-black text-white rounded-md mt-6 overflow-x-auto">
                <pre className="text-sm sm:text-base whitespace-pre-wrap sm:whitespace-pre">
                  <code>{item?.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterContent
