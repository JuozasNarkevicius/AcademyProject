import {
  Container, Typography, List, ListItem, CircularProgress, ListItemButton, Chip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { programService } from '../services/ProgramService';
import ROUTES from '../constants/Routes';

const SharedPrograms = () => {
  const [programs, setPrograms] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getPrograms = async () => {
    const response = await programService.getAllPublicProgramsAPI();
    setPrograms(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getPrograms();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: '5rem' }}>
      <Typography>Okay</Typography>
      <List>
        {programs.map((program) => (
          <ListItem key={program.id}>
            <ListItemButton onClick={() => navigate(`${ROUTES.PUBLIC_PROGRAM}/${program.id}`, { replace: true })}>
              <Typography>{program.name}</Typography>
              <Chip label="category" color="success" variant="outlined" sx={{ ml: '20px' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SharedPrograms;
