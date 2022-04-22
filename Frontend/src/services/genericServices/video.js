const isPlaylistUrl = (url) => {
  if (url.includes('&')) {
    return url.indexOf('&');
  }
  return url.length;
};

const getIdFromUrl = (url) => url.substring(url.indexOf('=') + 1, isPlaylistUrl(url));

const videoService = {
  getIdFromUrl,
};

export default videoService;
