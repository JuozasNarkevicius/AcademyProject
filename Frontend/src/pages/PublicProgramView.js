import React, { useState, useEffect } from 'react';
import {
  Container, Box, CssBaseline,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import programService from '../services/ProgramService';
import ratingService from '../services/Rating';
import ProgramAccordion from '../components/dataDisplay/ProgramAccordion';
import Loading from '../components/Loading';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import Button from '../components/Button';
import RatingCards from '../components/dataDisplay/RatingCards';

const PublicProgramView = () => {
  const [program, setProgram] = useState();
  const [personalRating, setPersonalRating] = useState();
  const [isSaved, setIsSaved] = useState();
  const [ratingsCount, setRatingsCount] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');

  const getData = async () => {
    try {
      const programResponse = await programService.getProgramAPI(id);
      const ratingResponse = await ratingService.getMyRatingAPI(userId, 'programs', id);
      const ratingsCountResponse = await ratingService.getRatingsCountAPI('programs', id);
      const isProgramSaved = await programService.isProgramSavedAPI(id);
      setProgram(programResponse.data);
      setPersonalRating(ratingResponse.data);
      setRatingsCount(ratingsCountResponse.data);
      setIsSaved(isProgramSaved.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate(-1);
      }
    }
    setIsLoading(false);
  };

  const saveProgram = async () => {
    setIsSaved(true);
    await programService.saveProgramAPI(program.id);
  };

  const unfollowProgram = async () => {
    setIsSaved(false);
    await programService.deleteSavedProgramAPI(program.id);
  };

  const removeRating = async () => {
    await ratingService.deleteRatingAPI(personalRating.id);
    const programResponse = await programService.getProgramAPI(id);
    setProgram(programResponse.data);
    const newRatingsCount = ratingsCount;
    setRatingsCount(newRatingsCount - 1);
    setPersonalRating();
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{
      mt: '-2.5rem',
      backgroundImage: `url(${backgroundImage})`,
      minWidth: '100%',
      minHeight: '96.5vh',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      overflow: 'hidden',
    }}
    >
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
        sx={{ float: 'left', m: '2rem', ml: '20vw' }}
      >
        <RatingCards
          itemRating={program.rating}
          personalRating={personalRating}
          ratingsCount={ratingsCount}
          itemId={id}
          itemIdName="programId"
          userId={userId}
          removeRating={removeRating}
          getData={getData}
        />
      </Box>
      <Box sx={{ float: 'left', mt: '1.3rem' }}>
        {isSaved
          ? <Button text="Unfollow program" onClick={unfollowProgram} width="10rem" />
          : <Button text="Follow program" onClick={saveProgram} />}

      </Box>
    </Container>
  );
};

export default PublicProgramView;
