import React from 'react';
import { Container, CircularProgress } from '@mui/material';
import COLORS from '../styles/colors';

const Loading = () => (
  <Container sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '93.1vh',
    backgroundColor: COLORS.BACKGROUND,
    minWidth: '100%',
  }}
  >
    <CircularProgress sx={{ color: COLORS.TEXT }} />
  </Container>
);

export default Loading;
