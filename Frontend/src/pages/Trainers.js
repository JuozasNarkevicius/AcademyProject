import React, { useEffect, useState } from 'react';
import {
  Card, Container, CardActions, CardContent,
  Button, Typography, Grid, CircularProgress, CssBaseline,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/Routes';
import applicationService from '../services/ApplicationService';
import paginationService from '../services/genericServices/pagination';
import SearchBar from '../components/dataInput/SearchBar';
import Pagination from '../components/layout/Pagination';

const Trainers = () => {
  const [trainers, setTrainers] = useState();
  const [filteredTrainers, setFilteredTrainers] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 9;

  const getTrainers = async () => {
    const response = await applicationService.getVerifiedApplicationsAPI();
    setTrainers(response.data);
    setFilteredTrainers(response.data);
    setIsLoading(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getTrainers();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: '2.5rem' }}>
      <CssBaseline />
      <Typography variant="h5">Registered trainers</Typography>
      <SearchBar
        elements={trainers}
        setFilteredElements={setFilteredTrainers}
        attribute="fullName"
      />
      <Grid container spacing={2}>
        {paginationService.getElementsByPage(filteredTrainers, page, pageSize).map((trainer) => (
          <Grid key={trainer.id} item xs={4}>
            <Card sx={{ margin: '1rem' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {`${trainer.firstName}${' '}${trainer.lastName}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {trainer.qualification}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`${ROUTES.TRAINER_PROFILE}/${trainer.id}`)}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        onClick={() => navigate(ROUTES.TRAINER_APPLICATION, { replace: true })}
      >
        Become a trainer
      </Button>
      <Pagination
        elements={trainers}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default Trainers;
