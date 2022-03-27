import {
  Container, Typography, List, ListItem, CircularProgress,
  ListItemButton, Chip, Box, Pagination, Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { programService } from '../services/ProgramService';
import ROUTES from '../constants/Routes';
import paginationService from '../services/genericServices/pagination';

const SharedPrograms = () => {
  const [programs, setPrograms] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 10;

  const getPrograms = async () => {
    const response = await programService.getAllPublicProgramsAPI();
    setPrograms(response.data);
    setIsLoading(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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
        {paginationService.getElementsByPage(programs, page, pageSize).map((program) => (
          <ListItem key={program.id}>
            <ListItemButton onClick={() => navigate(`${ROUTES.PUBLIC_PROGRAM}/${program.id}`, { replace: true })}>
              <Typography>{program.name}</Typography>
              <Chip label="category" color="success" variant="outlined" sx={{ ml: '20px' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack spacing={2}>
          <Pagination count={paginationService.getPageCount(programs, pageSize)} shape="rounded" onChange={handlePageChange} />
        </Stack>
      </Box>
    </Container>
  );
};

export default SharedPrograms;
