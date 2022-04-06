import {
  Container, Typography, List, ListItem, CircularProgress,
  ListItemButton, Chip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import programService from '../services/ProgramService';
import ROUTES from '../constants/Routes';
import paginationService from '../services/genericServices/pagination';
import Pagination from '../components/layout/Pagination';
import SearchBar from '../components/dataInput/SearchBar';

const SharedPrograms = () => {
  const [programs, setPrograms] = useState();
  const [filteredPrograms, setfilteredPrograms] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 10;

  const getPrograms = async () => {
    const response = await programService.getAllPublicProgramsAPI();
    setPrograms(response.data);
    setfilteredPrograms(response.data);
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
      <Typography variant="h5">Programs shared by other users</Typography>
      <SearchBar
        elements={programs}
        setFilteredElements={setfilteredPrograms}
        attribute="name"
      />
      <List>
        {paginationService.getElementsByPage(filteredPrograms, page, pageSize).map((program) => (
          <ListItem key={program.id}>
            <ListItemButton onClick={() => navigate(`${ROUTES.PUBLIC_PROGRAM}/${program.id}`, { replace: true })}>
              <Typography>{program.name}</Typography>
              <Chip label="category" color="success" variant="outlined" sx={{ ml: '20px' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Pagination
        elements={programs}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default SharedPrograms;
