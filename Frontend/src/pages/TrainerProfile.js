/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Card, Container, CardContent, Typography, CssBaseline, Box, Grid, ButtonBase,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import firebaseStorage from '../services/FirebaseStorage';
import Loading from '../components/Loading';
import COLORS from '../styles/colors';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import ProfileCard from '../components/dataDisplay/ProfileCard';

const TrainerProfile = () => {
  const [trainer, setTrainer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getTrainer = async () => {
    const response = await applicationService.getApplicationAPI(id);
    const img = await firebaseStorage.getProfileImage(response.data.imageId);
    response.data.profileImage = window.URL.createObjectURL(img);
    setTrainer(response.data);
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
