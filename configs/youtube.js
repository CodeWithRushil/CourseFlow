const { default: axios } = require("axios");
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

const getVideos = async (query, maxResults = 1) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: Math.max(maxResults, 5),
    type: "video",
    relevanceLanguage: "en",
    safeSearch: "strict",
    videoEmbeddable: "true",
    videoSyndicated: "true",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  };
  const res = await axios.get(YOUTUBE_BASE_URL + "/search", { params });
  return (res.data.items || [])
    .filter((item) => item?.id?.videoId)
    .slice(0, maxResults);
};

export default { getVideos };
