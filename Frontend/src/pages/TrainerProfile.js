import React, { useEffect, useState } from 'react';
import {
  Container, CssBaseline, Box,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import Loading from '../components/Loading';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import ProfileCard from '../components/dataDisplay/ProfileCard';

const TrainerProfile = () => {
  const [trainer, setTrainer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const getTrainer = async () => {
    try {
      const response = await applicationService.getApplicationAPI(id);
      setTrainer(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate(-1);
      }
    }
    setIsLoading(false);
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
      minHeight: '93vh',
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
        <ProfileCard trainer={trainer} />
      </Box>
    </Container>
  );
};

export default TrainerProfile;
