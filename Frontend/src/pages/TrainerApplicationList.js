import React, { useEffect, useState } from 'react';
import {
  Container, List, ListItem, ListItemButton, Chip, Typography, CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import ROUTES from '../constants/Routes';

const TrainerApplicationList = () => {
  const [applications, setApplications] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getApplications = async () => {
    const response = await applicationService.getAllApplicationsAPI();
    setApplications(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getApplications();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <List>
        {applications.map((application) => (
          <ListItem key={application.id}>
            <ListItemButton onClick={() => navigate(`${ROUTES.TRAINER_APPLICATION_VIEW}/${application.id}`)}>
              <Typography>{application.description}</Typography>
              <Chip label="test" color="success" variant="outlined" sx={{ ml: '20px' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TrainerApplicationList;
