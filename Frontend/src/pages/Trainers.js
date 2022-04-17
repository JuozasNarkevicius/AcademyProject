import React, { useEffect, useState } from 'react';
import {
  Card, Container, CardActions, CardContent,
  Button, Typography, Grid, CssBaseline,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/Routes';
import applicationService from '../services/ApplicationService';
import paginationService from '../services/genericServices/pagination';
import SearchBar from '../components/dataInput/SearchBar';
import Pagination from '../components/layout/Pagination';
import COLORS from '../styles/colors';
import Loading from '../components/Loading';
import backgroundImage from '../assets/images/workoutEquipment.jpg';

const Trainers = () => {
  const [trainers, setTrainers] = useState();
  const [filteredTrainers, setFilteredTrainers] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 9;

  const getTrainers = async () => {
    try {
      const response = await applicationService.getVerifiedApplicationsAPI();
      setTrainers(response.data);
      setFilteredTrainers(response.data);
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
    getTrainers();
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
      <Typography variant="h5">Registered trainers</Typography>
      <SearchBar
        elements={trainers}
        setFilteredElements={setFilteredTrainers}
        attribute="fullName"
      />
      <Grid container spacing={2}>
        {paginationService.getElementsByPage(filteredTrainers, page, pageSize).map((trainer) => (
          <Grid key={trainer.id} item xs={4}>
            <Card sx={{ margin: '1rem', backgroundColor: COLORS.ITEM }}>
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
                  sx={{
                    color: COLORS.TEXT,
                    backgroundColor: COLORS.SECONDARY,
                    '&:hover': {
                      background: COLORS.SECONDARY_HOVER,
                    },
                  }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        elements={trainers}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default Trainers;
