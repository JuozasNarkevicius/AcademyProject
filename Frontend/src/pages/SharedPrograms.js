import {
  Container, Typography, List, ListItem,
  ListItemButton, Chip, CssBaseline, Box,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import programService from '../services/ProgramService';
import ROUTES from '../constants/Routes';
import paginationService from '../services/genericServices/pagination';
import Pagination from '../components/layout/Pagination';
import SearchBar from '../components/dataInput/SearchBar';
import Loading from '../components/Loading';
import COLORS from '../styles/colors';
import backgroundImage from '../assets/images/workoutEquipment.jpg';

const SharedPrograms = () => {
  const [programs, setPrograms] = useState();
  const [filteredPrograms, setfilteredPrograms] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 10;

  const getPrograms = async () => {
    try {
      const response = await programService.getAllPublicProgramsAPI();
      setPrograms(response.data);
      setfilteredPrograms(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate(-1);
      }
    }
    setIsLoading(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getPrograms();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{
      minWidth: '100%',
      minHeight: '93vh',
      paddingTop: '5rem',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
    }}
    >
      <CssBaseline />
      <Box>
        <Typography variant="h5">Programs shared by other users</Typography>
        <SearchBar
          elements={programs}
          setFilteredElements={setfilteredPrograms}
          attribute="name"
        />
        <List>
          {paginationService.getElementsByPage(filteredPrograms, page, pageSize).map((program) => (
            <ListItem key={program.id} sx={{ width: '60rem' }}>
              <ListItemButton
                sx={{
                  backgroundColor: COLORS.ITEM,
                  borderRadius: '10px',
                  '&:hover': { backgroundColor: COLORS.SUB_ITEM },
                }}
                onClick={() => navigate(`${ROUTES.PUBLIC_PROGRAM}/${program.id}`)}
              >
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
      </Box>
    </Container>
  );
};

export default SharedPrograms;
