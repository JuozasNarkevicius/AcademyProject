import React from 'react';
import { Card, Container } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const TrainerProfile = () => (
  <Container sx={{ mt: '2rem' }}>
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Trainer profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Also something
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  </Container>
);

export default TrainerProfile;
