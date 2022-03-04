import React, { useEffect, useState } from 'react';
import {
  Container, Card, CardContent, Typography, CircularProgress, Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import applicationService from '../services/ApplicationService';

const TrainerApplicationView = () => {
  const [application, setApplication] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getApplication = async () => {
    const response = await applicationService.getApplicationAPI(id);
    setApplication(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getApplication();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: '2rem' }}>
      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {application.profileImage}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {application.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {application.qualifications}
          </Typography>
        </CardContent>
      </Card>
      <Button variant="contained">Approve</Button>
      <Button variant="contained">Dismiss</Button>
    </Container>
  );
};

export default TrainerApplicationView;
