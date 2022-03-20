import React, { useEffect, useState } from 'react';
import { Card, Container, CircularProgress } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import applicationService from '../services/ApplicationService';

const TrainerProfile = () => {
  const [trainer, setTrainer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getTrainer = async () => {
    const response = await applicationService.getApplicationAPI(id);
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
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Trainer profile
          </Typography>
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
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default TrainerProfile;
