import React, { useEffect, useState } from 'react';
import {
  Container, List, ListItem, ListItemButton, Chip, Typography,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import ROUTES from '../constants/Routes';
import STATUS_COLORS from '../constants/statusColors';
import paginationService from '../services/genericServices/pagination';
import Pagination from '../components/layout/Pagination';
import SearchBar from '../components/dataInput/SearchBar';

const TrainerApplicationList = () => {
  const [applications, setApplications] = useState();
  const [filteredApplications, setFilteredApplications] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 10;

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
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: '5rem' }}>
      <Typography variant="h5">Trainer profile applications</Typography>
      <SearchBar
        elements={applications}
        setFilteredElements={setFilteredApplications}
        attribute="fullName"
      />
      <List>
        {paginationService.getElementsByPage(filteredApplications, page, pageSize)
          .map((application) => (
            <ListItem key={application.id}>
              <ListItemButton onClick={() => navigate(`${ROUTES.TRAINER_APPLICATION_VIEW}/${application.id}`)}>
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
      <Pagination
        elements={applications}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default TrainerApplicationList;
