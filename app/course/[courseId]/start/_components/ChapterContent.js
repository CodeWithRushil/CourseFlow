import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'

const ChapterContent = ({ chapter, includeVideo, content }) => {
  const opts = {
    height: '300',
    width: '600',
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl'>{chapter?.chapterName}</h2>
      <p className='text-gray-500'>{chapter?.about}</p>


      {includeVideo && <div className='flex justify-center my-6'>
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>}

      <div>
        {content?.content?.map((item, index) => (
          <div key={index} className='p-5 bg-sky-50 mb-3 rounded-lg mt-10'>
            <h2 className='font-semibold text-lg'>{item?.title}</h2>
            <ReactMarkdown>{item?.explanation}</ReactMarkdown>
            {/* add condition if null */}
              {item?.code && <div className='p-4 bg-black text-white rounded-md mt-10'>
                <pre>
                  <code>{item?.code}</code>
                </pre>
              </div>}
          </div>
        ))}
      </div>

    </div>
  )
}

export default ChapterContent