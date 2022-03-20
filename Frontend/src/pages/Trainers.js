/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Card, Container, CardActions, CardContent,
  Button, Typography, Grid, CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/Routes';
import applicationService from '../services/ApplicationService';

const trainersDummy = [
  {
    name: 'Petras',
    surname: 'Petraitis',
    qualification: 'trainer',
  },
  {
    name: 'Petras',
    surname: 'Petraitis',
    qualification: 'trainer',
  },
  {
    name: 'Petras',
    surname: 'Petraitis',
    qualification: 'trainer',
  },
  {
    name: 'Petras',
    surname: 'Petraitis',
    qualification: 'trainer',
  },
  {
    name: 'Petras',
    surname: 'Petraitis',
    qualification: 'trainer',
  },
  {
    name: 'Petras',
    surname: 'Petraitis',
    qualification: 'trainer',
  },
  {
    name: 'Petras',
    surname: 'Petraitis',
    qualification: 'trainer',
  },
  {
    name: 'Petras',
    surname: 'Petraitis',
    qualification: 'trainer',
  },
  {
    name: 'Petras',
    surname: 'Petraitis',
    qualification: 'trainer',
  },
];

const Trainers = () => {
  const [trainers, setTrainers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getTrainers = async () => {
    const response = await applicationService.getVerifiedApplicationsAPI();
    setTrainers(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getTrainers();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Button variant="contained" onClick={() => navigate(ROUTES.TRAINER_APPLICATION, { replace: true })}>Become trainer</Button>
      <Grid container spacing={2}>
        {trainers.map((trainer) => (
          <Grid key={trainer.id} item xs={4}>
            <Card sx={{ margin: '1rem' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {`${trainer.firstName}${' '}${trainer.lastName}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {trainer.qualification}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" onClick={() => navigate(`${ROUTES.TRAINER_PROFILE}/${trainer.id}`)}>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Trainers;
