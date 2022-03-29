import React, { useState, useEffect } from 'react';
import {
  Container, Typography, CircularProgress, Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { programService } from '../services/ProgramService';
import ratingService from '../services/Rating';
import ProgramAccordion from '../components/dataDisplay/ProgramAccordion';

const PublicProgramView = () => {
  const [program, setProgram] = useState();
  const [personalRating, setPersonalRating] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const userId = sessionStorage.getItem('id');

  const getData = async () => {
    const programResponse = await programService.getProgramAPI(id);
    const ratingResponse = await ratingService.getMyRatingAPI(userId, id);
    setProgram(programResponse.data);
    setPersonalRating(ratingResponse.data);
    setIsLoading(false);
  };

  const saveProgram = async () => {
    await programService.saveProgramAPI(program.id);
  };

  const handleRatingChange = async (value) => {
    if (personalRating) {
      await ratingService.updateRatingAPI(personalRating.id, { starCount: value });
    } else {
      await ratingService.postRatingAPI({ starCount: value, programId: id, userId });
    }
    await getData();
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: '4rem' }}>
      <ProgramAccordion program={program} />
      <Rating
        sx={{ display: 'flex', float: 'left', mt: '1rem' }}
        value={program.rating}
        precision={0.5}
        onChange={(event, newValue) => {
          handleRatingChange(newValue);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Typography sx={{ float: 'left', mt: '1.15rem', ml: '0.5rem' }}>{program.rating}</Typography>
      <Button
        sx={{ float: 'left', ml: '1.5rem' }}
        variant="contained"
        onClick={saveProgram}
      >
        Add program to Library
      </Button>
      {personalRating && (
        <Typography sx={{ float: 'left', mt: '1.15rem', ml: '0.5rem' }}>
          Your rating:
          {' '}
          {personalRating.starCount}
        </Typography>
      )}
    </Container>
  );
};

export default PublicProgramView;