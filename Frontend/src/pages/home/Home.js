import { Typography, Grid, CssBaseline } from '@mui/material';
import athlete from '../../assets/images/athlete.png';
import programTool from '../../assets/images/programtool.png';
import personalTrainer from '../../assets/images/personalTrainer.webp';
import COLORS from '../../styles/colors';

const Home = () => (
  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 2, md: 12 }}>
    <CssBaseline />
    <Grid
      item
      xs={6}
      sx={{
        color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
    >
      <Typography sx={{ textAlign: 'left', fontSize: '35px', m: '13rem' }}>
        Your journey to a healthier life style begins today!
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <img src={athlete} alt="" style={{ height: '80vh', marginTop: '4rem' }} />
    </Grid>
    <Grid
      item
      xs={6}
      sx={{
        backgroundColor: COLORS.SECONDARY, minHeight: '65rem', display: 'flex', justifyContent: 'center', alignItems: 'center',
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
        Create your own workout programs with our flexible tool!
      </Typography>
    </Grid>
    <Grid
      item
      xs={6}
      sx={{
        color: 'white', minHeight: '65rem', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
    >
      <Typography sx={{ textAlign: 'left', fontSize: '35px', m: '13rem' }}>
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
  </Grid>
);

export default Home;
