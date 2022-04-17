import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, CssBaseline, Card, IconButton, Icon,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import programService from '../services/ProgramService';
import ratingService from '../services/Rating';
import ProgramAccordion from '../components/dataDisplay/ProgramAccordion';
import Loading from '../components/Loading';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import COLORS from '../styles/colors';
import exitIcon from '../assets/icons/x.svg';
import Button from '../components/Button';

const PublicProgramView = () => {
  const [program, setProgram] = useState();
  const [personalRating, setPersonalRating] = useState();
  const [isSaved, setIsSaved] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');

  const getData = async () => {
    try {
      const programResponse = await programService.getProgramAPI(id);
      const ratingResponse = await ratingService.getMyRatingAPI(userId, id);
      const isProgramSaved = await programService.isProgramSavedAPI(id);
      setProgram(programResponse.data);
      setPersonalRating(ratingResponse.data);
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

  const handleRatingChange = async (value) => {
    if (personalRating) {
      await ratingService.updateRatingAPI(personalRating.id, { starCount: value });
    } else {
      await ratingService.postRatingAPI({ starCount: value, programId: id, userId });
    }
    await getData();
  };

  const removerRating = async () => {
    await ratingService.deleteRatingAPI(personalRating.id);
    const programResponse = await programService.getProgramAPI(id);
    setProgram(programResponse.data);
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
      minHeight: '97.5vh',
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
        <Card sx={{ p: '1rem', backgroundColor: COLORS.SUB_ITEM }}>
          <Typography sx={{ display: 'flex' }}>
            Global rating:
            <Rating
              sx={{ ml: '5px', mr: '15px' }}
              value={program.rating}
              precision={0.5}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              readOnly
            />
            {program.rating !== 0 ? Math.round(program.rating * 2) / 2 : <>Rating not given</>}
          </Typography>
        </Card>
        <Card sx={{
          p: '1rem',
          mt: '1rem',
          backgroundColor: COLORS.SUB_ITEM,
        }}
        >
          <IconButton
            sx={{
              height: '40px',
              float: 'right',
              ml: '20px',
              '&:hover': { backgroundColor: COLORS.BACKGROUND },
            }}
            title="Remove my rating"
            onClick={removerRating}
          >
            <Icon>
              <img src={exitIcon} height={20} width={20} alt="k" />
            </Icon>
          </IconButton>
          <Typography sx={{ display: 'flex', mt: '0.5rem' }}>
            My rating:
            <Rating
              sx={{ ml: '5px', mr: '15px' }}
              value={personalRating ? personalRating.starCount : 0}
              precision={1}
              onChange={(event, newValue) => {
                handleRatingChange(newValue);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
            />
            {personalRating ? Math.round(personalRating.starCount * 2) / 2 : <>Rating not given</>}
          </Typography>
        </Card>
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
