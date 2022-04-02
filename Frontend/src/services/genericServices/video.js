const getIdFromUrl = (url) => url.substring(url.indexOf('=') + 1);

const videoService = {
  getIdFromUrl,
};

export default videoService;
