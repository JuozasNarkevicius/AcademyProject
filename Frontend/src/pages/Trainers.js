import React from 'react';
import {
  Card, Container, CardActions, CardContent,
  Button, Typography, Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/Routes';

const trainers = [
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
  const navigate = useNavigate();
  return (
    <Container>
      <Button variant="contained" onClick={() => navigate(ROUTES.TRAINER_APPLICATION, { replace: true })}>Become trainer</Button>
      <Grid container spacing={2}>
        {trainers.map((trainer) => (
          <Grid item xs={4}>
            <Card sx={{ margin: '1rem' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {`${trainer.name}${trainer.surname}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {trainer.qualification}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" onClick={() => navigate(ROUTES.TRAINER_PROFILE, { replace: true })}>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Trainers;
