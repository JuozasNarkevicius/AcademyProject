import React from 'react';
import { Container, CircularProgress } from '@mui/material';
import COLORS from '../styles/colors';
import backgroundImage from '../assets/images/workoutEquipment.jpg';

const Loading = () => (
  <Container sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '92.3vh',
    backgroundColor: COLORS.BACKGROUND,
    minWidth: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
  }}
  >
    <CircularProgress sx={{ color: COLORS.TEXT }} />
  </Container>
);

export default Loading;
