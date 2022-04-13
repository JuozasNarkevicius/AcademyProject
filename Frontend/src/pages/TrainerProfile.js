import React, { useEffect, useState } from 'react';
import {
  Card, Container, CardContent, Typography, CssBaseline, Box, Grid, ButtonBase,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import firebaseStorage from '../services/FirebaseStorage';
import Loading from '../components/Loading';
import COLORS from '../styles/colors';
import backgroundImage from '../assets/images/workoutEquipment.jpg';

const TrainerProfile = () => {
  const [trainer, setTrainer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getTrainer = async () => {
    const response = await applicationService.getApplicationAPI(id);
    const img = await firebaseStorage.getProfileImage(response.data.imageId);
    response.data.profileImage = window.URL.createObjectURL(img);
    setTrainer(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getTrainer();
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ minHeight: '30rem', width: '70rem', backgroundColor: COLORS.ITEM }}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item>
                <ButtonBase>
                  <img alt="" src={trainer.profileImage} style={{ height: '300px' }} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid container>
                  <Grid item xs>
                    <Typography variant="h5" sx={{ mr: '3rem', mb: '1rem' }}>
                      {`${trainer.firstName}${' '}${trainer.lastName}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ float: 'left' }}>
                      Description
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'left', mt: '2.5rem', mr: '1rem' }}>
                      {trainer.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ float: 'left', mt: '1rem' }}>
                    Qualifications
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: 'left', mt: '3.5rem' }}>
                    {trainer.qualifications}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ float: 'left', mt: '1rem' }}>
                    Contacts
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: 'left', mt: '3.5rem' }}>
                    {trainer.phoneNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: 'left' }}>
                    {trainer.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default TrainerProfile;
