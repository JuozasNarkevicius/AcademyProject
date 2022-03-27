import React, { useEffect, useState } from 'react';
import {
  Container, List, ListItem, ListItemButton, Chip, Typography,
  CircularProgress, Pagination, Stack, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import ROUTES from '../constants/Routes';
import STATUS_COLORS from '../constants/statusColors';
import paginationService from '../services/genericServices/pagination';

const TrainerApplicationList = () => {
  const [applications, setApplications] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 10;

  const getApplications = async () => {
    const response = await applicationService.getAllApplicationsAPI();
    setApplications(response.data);
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
    <Container>
      <List>
        {paginationService.getElementsByPage(applications, page, pageSize).map((application) => (
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack spacing={2}>
          <Pagination count={paginationService.getPageCount(applications, pageSize)} shape="rounded" onChange={handlePageChange} />
        </Stack>
      </Box>
    </Container>
  );
};

export default TrainerApplicationList;
