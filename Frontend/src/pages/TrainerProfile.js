import React, { useEffect, useState } from 'react';
import {
  Container, CssBaseline, Box, CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import ProfileCard from '../components/dataDisplay/ProfileCard';
import RatingCards from '../components/dataDisplay/RatingCards';
import ratingService from '../services/Rating';
import Loading from '../components/Loading';

const TrainerProfile = () => {
  const [trainer, setTrainer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [personalRating, setPersonalRating] = useState();
  const [ratingsCount, setRatingsCount] = useState();
  const { id } = useParams();
  const userId = sessionStorage.getItem('id');
  const navigate = useNavigate();

  const getTrainer = async () => {
    try {
      const response = await applicationService.getApplicationAPI(id);
      const ratingResponse = await ratingService.getMyRatingAPI(userId, 'trainers', id);
      const ratingsCountResponse = await ratingService.getRatingsCountAPI('trainers', id);
      setPersonalRating(ratingResponse.data);
      setTrainer(response.data);
      setRatingsCount(ratingsCountResponse.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        navigate(-1);
      }
    }
  };

  const removeRating = async () => {
    await ratingService.deleteRatingAPI(personalRating.id);
    const response = await applicationService.getApplicationAPI(id);
    setTrainer(response.data);
    const newRatingsCount = ratingsCount;
    setRatingsCount(newRatingsCount - 1);
    setPersonalRating();
  };

  useEffect(() => {
    getTrainer();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{
      minWidth: '100%',
      minHeight: '92.3vh',
      paddingTop: '2rem',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    }}
    >
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ProfileCard
          trainer={trainer}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          RatingCards={(
            <RatingCards
              itemRating={trainer.rating}
              personalRating={personalRating}
              ratingsCount={ratingsCount}
              itemId={id}
              itemIdName="trainerId"
              userId={userId}
              removeRating={removeRating}
              getData={getTrainer}
            />
          )}
        />
      </Box>
    </Container>
  );
};

export default TrainerProfile;
