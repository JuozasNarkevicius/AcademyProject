/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Card, Container, CircularProgress, CardContent, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import firebaseStorage from '../services/FirebaseStorage';

const TrainerProfile = () => {
  const [trainer, setTrainer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getTrainer = async () => {
    const response = await applicationService.getApplicationAPI(id);
    console.log(response.data);
    const img = await firebaseStorage.getProfileImage();
    const image = window.URL.createObjectURL(img);
    response.data.profileImage = image;
    console.log(response.data);
    setTrainer(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getTrainer();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: '2rem' }}>
      <Card sx={{ minHeight: '30rem' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Trainer profile
          </Typography>
          <img src={trainer.profileImage} alt="" />
          <Typography variant="body2" color="text.secondary">
            {`${trainer.firstName}${' '}${trainer.lastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trainer.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trainer.qualification}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {trainer.phoneNumber}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TrainerProfile;
