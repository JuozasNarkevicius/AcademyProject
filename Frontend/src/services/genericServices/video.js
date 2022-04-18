const getIdFromUrl = (url) => url.substring(url.indexOf('=') + 1, url.indexOf('&'));

const videoService = {
  getIdFromUrl,
};

export default videoService;
