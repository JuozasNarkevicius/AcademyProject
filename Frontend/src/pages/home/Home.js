import React from 'react';
import {
  Typography, Grid, CssBaseline, Icon, IconButton, Box,
} from '@mui/material';
import athlete from '../../assets/images/athlete.png';
import programTool from '../../assets/images/program_tool.png';
import personalTrainer from '../../assets/images/personalTrainer.webp';
import COLORS from '../../styles/colors';
import FadeInSection from '../../components/layout/fadeInSection/FadeInSection';
import phone from '../../assets/images/phone.png';
import google from '../../assets/images/google.png';
import apple from '../../assets/icons/apple.svg';

const Home = () => (
  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, md: 12 }}>
    <CssBaseline />
    <FadeInSection>
      <Grid
        item
        xs={6}
        sx={{
          color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40rem',
        }}
      >
        <Typography sx={{ textAlign: 'left', fontSize: '35px', m: '13rem' }}>
          Your journey to a healthier life style begins today!
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <img src={athlete} alt="" style={{ height: '80vh', marginTop: '4rem' }} />
      </Grid>
    </FadeInSection>
    <FadeInSection>
      <Grid
        item
        xs={6}
        sx={{
          backgroundColor: COLORS.SECONDARY, minHeight: '45rem', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <img
          src={programTool}
          alt=""
          style={{
            height: '60vh', marginLeft: '5vw', borderRadius: '15px', marginRight: '5vw',
          }}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          backgroundColor: COLORS.SECONDARY, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <Typography sx={{ textAlign: 'left', fontSize: '35px', m: '13rem' }}>
          Create and rearrange your own workout programs with our flexible tool!
        </Typography>
      </Grid>
    </FadeInSection>
    <FadeInSection>
      <Grid
        item
        xs={6}
        sx={{
          color: 'white', minHeight: '45rem', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '7rem',
        }}
      >
        <Typography sx={{
          textAlign: 'left', fontSize: '35px', m: '13rem', mt: '7.5rem',
        }}
        >
          Find a suitable trainer, who can help you along with your journey!
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <img
          src={personalTrainer}
          alt=""
          style={{
            height: '50vh', marginLeft: '2vw', borderRadius: '15px', marginRight: '10vw',
          }}
        />
      </Grid>
    </FadeInSection>
    <FadeInSection>
      <Grid
        item
        xs={6}
        sx={{
          backgroundColor: COLORS.SECONDARY, minHeight: '45rem', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <img
          src={phone}
          alt=""
          style={{
            height: '80vh', marginLeft: '5vw', borderRadius: '15px', marginRight: '5vw',
          }}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          backgroundColor: COLORS.SECONDARY, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <Typography sx={{ textAlign: 'left', fontSize: '35px', mr: '4rem' }}>
          Check your programs during your workout with our handy mobile application!
          <Box sx={{ mt: '2rem' }}>
            <img src={apple} height={67} width={210} alt="k" style={{ position: 'relative', top: -15 }} />
            <img src={google} height={101} width={250} alt="k" style={{ position: 'relative', top: 1 }} />
          </Box>
        </Typography>
      </Grid>
    </FadeInSection>
  </Grid>
);

export default Home;
