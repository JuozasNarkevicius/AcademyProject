import API from './API';

const postRatingAPI = async (rating) => {
  const response = await API.post('/ratings', rating);
  return response;
};

const updateRatingAPI = async (ratingId, rating) => {
  await API.put(`/ratings/${ratingId}`, rating);
};

const getMyRatingAPI = async (userId, programId) => {
  const response = await API.get('/myRatings', { params: { userId, programId } });
  return response;
};

const deleteRatingAPI = async (ratingId) => {
  await API.delete(`/ratings/${ratingId}`);
};

const getRatingsCountAPI = async (programId) => {
  const response = await API.get(`/programs/${programId}/ratingsCount`);
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
