/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Container, List, ListItem, ListItemButton, Chip, Typography, CssBaseline, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import ROUTES from '../constants/Routes';
import STATUS_COLORS from '../constants/statusColors';
import paginationService from '../services/genericServices/pagination';
import Pagination from '../components/layout/Pagination';
import SearchBar from '../components/dataInput/SearchBar';
import Loading from '../components/Loading';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import COLORS from '../styles/colors';

const TrainerApplicationList = () => {
  const [applications, setApplications] = useState();
  const [filteredApplications, setFilteredApplications] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 9;

  const getApplications = async () => {
    const response = await applicationService.getAllApplicationsAPI();
    setApplications(response.data);
    setFilteredApplications(response.data);
    setIsLoading(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getApplications();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{
      minWidth: '100%',
      minHeight: '93vh',
      paddingTop: '2rem',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    }}
    >
      <CssBaseline />
      <Box>
        <Typography variant="h5">Trainer profile applications</Typography>
        <SearchBar
          elements={applications}
          setFilteredElements={setFilteredApplications}
          attribute="fullName"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <List>
          {paginationService.getElementsByPage(filteredApplications, page, pageSize)
            .map((application) => (
              <ListItem key={application.id} sx={{ width: '30rem' }}>
                <ListItemButton
                  sx={{
                    backgroundColor: COLORS.ITEM,
                    borderRadius: '10px',
                    '&:hover': { backgroundColor: COLORS.SUB_ITEM },
                  }}
                  onClick={() => navigate(`${ROUTES.TRAINER_APPLICATION_VIEW}/${application.id}`)}
                >
                  <Typography>{`${application.firstName} ${application.lastName}`}</Typography>
                  <Chip
                    sx={{ ml: 1 }}
                    label={application.status}
                    color={STATUS_COLORS[application.status]}
                    variant="outlined"
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
      <Pagination
        elements={applications}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default TrainerApplicationList;
