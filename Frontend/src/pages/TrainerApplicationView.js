import React, { useEffect, useState } from 'react';
import {
  Container, Card, CardContent, Typography, CircularProgress, Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import userService from '../services/UserService';

const TrainerApplicationView = () => {
  const [application, setApplication] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getApplication = async () => {
    const response = await applicationService.getApplicationAPI(id);
    setApplication(response.data);
    setIsLoading(false);
  };

  const approveTrainer = async () => {
    await userService.changeUserRoleAPI(application.userId, 'trainer');
    await applicationService.changeApplicationStatusAPI(application.id, 'verified');
  };

  useEffect(() => {
    getApplication();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: '2rem', width: '80%' }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${application.firstName} ${application.lastName}`}
          </Typography>
          <Typography variant="body2">
            {application.profileImage}
          </Typography>
          <Typography variant="h5">Description</Typography>
          <Typography gutterBottom variant="body2" component="div">
            {application.description}
          </Typography>
          <Typography variant="h5">Qualifications</Typography>
          <Typography variant="body2">
            {application.qualifications}
          </Typography>
          <Typography variant="h5">Email</Typography>
          <Typography variant="body2">
            {application.email}
          </Typography>
          <Typography variant="h5">Phone number</Typography>
          <Typography variant="body2">
            {application.phoneNumber}
          </Typography>
        </CardContent>
      </Card>
      <Button variant="contained" onClick={approveTrainer}>Approve</Button>
      <Button variant="contained">Dismiss</Button>
    </Container>
  );
};

export default TrainerApplicationView;