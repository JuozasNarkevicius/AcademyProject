import React from 'react';
import {
  Card, CardContent, Typography, CardActions, Button, Container,
} from '@mui/material';
import PropTypes from 'prop-types';

const ProfileCard = ({ trainer }) => (
  <Container>
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Trainer profile
        </Typography>
        <img src={trainer.profileImage} alt="" />
        <Typography variant="body2" color="text.secondary">
          {`${trainer.firstName}${' '}${trainer.lastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {trainer.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {trainer.qualification}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {trainer.phoneNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  </Container>
);

export default ProfileCard;

ProfileCard.propTypes = {
  trainer: PropTypes.instanceOf(Object).isRequired,
};
