import React from 'react';
import {
  Card, CardContent, Typography, Grid, CircularProgress, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import COLORS from '../../styles/colors';

const ProfileCard = ({
  trainer, isLoading, setIsLoading, RatingCards,
}) => {
  if (setIsLoading) {
    const img = new Image();
    img.src = trainer.imageId;
    img.onload = () => {
      setIsLoading(false);
    };
  }

  if (isLoading) {
    return (
      <Card sx={{
        minHeight: '30rem',
        width: '70rem',
        backgroundColor: COLORS.ITEM,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <CircularProgress sx={{ color: COLORS.TEXT }} />
      </Card>
    );
  }
  return (
    <Card sx={{ minHeight: '30rem', width: '70rem', backgroundColor: COLORS.ITEM }}>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item>
            <img alt="" loading="eager" src={trainer.imageId} style={{ height: '300px' }} />
            {RatingCards && (
              <Box sx={{ mt: '3rem' }}>
                {RatingCards}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid container>
              <Grid item xs>
                <Typography variant="h5" sx={{ mr: '3rem', mb: '1rem' }}>
                  {`${trainer.firstName}${' '}${trainer.lastName}`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ float: 'left' }}>
                  Description
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'left', mt: '2.5rem', mr: '1rem' }}>
                  {trainer.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ float: 'left', mt: '1rem' }}>
                Qualifications
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'left', mt: '3.5rem' }}>
                {trainer.qualifications}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ float: 'left', mt: '1rem' }}>
                Specializations
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'left', mt: '3.5rem' }}>
                {trainer.specializations}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ float: 'left', mt: '1rem' }}>
                Work experience
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'left', mt: '3.5rem' }}>
                {trainer.workExperience}
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
  );
};

export default ProfileCard;

ProfileCard.propTypes = {
  trainer: PropTypes.instanceOf(Object),
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func,
  RatingCards: PropTypes.node,
};

ProfileCard.defaultProps = {
  trainer: {},
  setIsLoading: null,
  RatingCards: null,
};
