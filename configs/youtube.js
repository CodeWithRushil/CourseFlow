const { default: axios } = require("axios");
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

const searchVideos = async (query, maxResults = 10, pageToken) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: Math.min(Math.max(maxResults, 5), 50),
    type: "video",
    relevanceLanguage: "en",
    safeSearch: "strict",
    videoEmbeddable: "true",
    videoSyndicated: "true",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  };
  if (pageToken) params.pageToken = pageToken;

  const res = await axios.get(YOUTUBE_BASE_URL + "/search", { params });
  return {
    items: (res.data.items || []).filter((item) => item?.id?.videoId),
    nextPageToken: res.data.nextPageToken || null,
  };
};

const getVideos = async (query, maxResults = 1) => {
  const { items } = await searchVideos(query, maxResults);
  return items.slice(0, maxResults);
};

const findUniqueVideo = async (query, usedVideoIds, maxPages = 10) => {
  let pageToken;

  for (let page = 0; page < maxPages; page++) {
    const { items, nextPageToken } = await searchVideos(query, 10, pageToken);
    const match = items.find((item) => {
      const id = item?.id?.videoId;
      return id && !usedVideoIds.has(id);
    });

    if (match?.id?.videoId) return match.id.videoId;
    if (!nextPageToken) break;
    pageToken = nextPageToken;
  }

  return "";
};

export default { getVideos, findUniqueVideo };
