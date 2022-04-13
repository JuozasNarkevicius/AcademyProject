import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Box, CssBaseline,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import programService from '../services/ProgramService';
import ratingService from '../services/Rating';
import ProgramAccordion from '../components/dataDisplay/ProgramAccordion';
import Loading from '../components/Loading';

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
    return <Loading />;
  }

  return (
    <Container sx={{ mb: '4rem', mt: '-2.5rem' }}>
      <CssBaseline />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <ProgramAccordion program={program} />
      </Box>
      <Box
        sx={{ float: 'left', m: '2rem' }}
      >
        <Typography>
          <Rating
            sx={{ mr: '1rem' }}
            value={program.rating}
            precision={0.5}
            onChange={(event, newValue) => {
              handleRatingChange(newValue);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
          />
          <Typography sx={{ float: 'right' }}>{Math.round(program.rating * 2) / 2}</Typography>
        </Typography>
        {personalRating && (
          <Typography sx={{ float: 'left', mt: '1.15rem', ml: '1.5rem' }}>
            Your rating:
            {' '}
            {personalRating.starCount}
          </Typography>
        )}
      </Box>
      <Box sx={{
        display: 'flex', justifyContent: 'center', mt: '2.7rem', mr: '13rem',
      }}
      >
        <Button
          sx={{ float: 'left', ml: '1.5rem' }}
          variant="contained"
          onClick={saveProgram}
        >
          Follow program
        </Button>
      </Box>
    </Container>
  );
};

export default PublicProgramView;
