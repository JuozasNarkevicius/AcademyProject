import API from './API';

const postRatingAPI = async (rating) => {
  const response = await API.post('/ratings', rating);
  return response;
};

const updateRatingAPI = async (ratingId, rating) => {
  await API.put(`/ratings/${ratingId}`, rating);
};

const getMyRatingAPI = async (userId, item, itemId) => {
  const response = await API.get(`/user/${userId}/${item}/${itemId}/myRating`);
  return response;
};

const deleteRatingAPI = async (ratingId) => {
  await API.delete(`/ratings/${ratingId}`);
};

const getRatingsCountAPI = async (item, itemId) => {
  const response = await API.get(`/${item}/${itemId}/ratingsCount`);
  return response;
};

const ratingService = {
  postRatingAPI,
  getMyRatingAPI,
  updateRatingAPI,
  deleteRatingAPI,
  getRatingsCountAPI,
};

export default ratingService;
