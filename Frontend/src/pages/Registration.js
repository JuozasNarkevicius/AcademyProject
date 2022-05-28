import {
  Button, Container, TextField, CssBaseline, Box, Card,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import authenticationService from '../services/AuthenticationService';
import ROUTES from '../constants/Routes';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import COLORS from '../styles/colors';

const registationFields = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
];

const validationSchema = yup.object({
  firstName: yup.string().required('Enter your first name'),
  lastName: yup.string().required('Enter your last name'),
  email: yup.string().email('Enter a valid email').required('Enter your email'),
  password: yup.string().min(4).required('Enter your password'),
});

const Registration = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await authenticationService.registerAPI(values);
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });

  return (
    <Container sx={{
      minWidth: '100%',
      minHeight: '92.3vh',
      paddingTop: '5rem',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    }}
    >
      <CssBaseline />
      <Box sx={{
        display: 'flex', justifyContent: 'center', marginTop: '5vh',
      }}
      >
        <Card sx={{ pt: '1.5rem', pb: '1rem' }}>
          <form onSubmit={formik.handleSubmit} style={{ maxWidth: '20rem' }}>
            {registationFields.map((r) => (
              <TextField
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                variant="filled"
                sx={{
                  m: '10px', backgroundColor: '#2d2b2b', color: 'white',
                }}
                key={r.name}
                name={r.name}
                label={r.label}
                type={r.type}
                value={formik.values[r.name]}
                onChange={formik.handleChange}
                error={formik.touched[r.name] && Boolean(formik.errors[r.name])}
                helperText={formik.touched[r.name] && formik.errors[r.name]}
              />
            ))}
            <Button
              sx={{
                margin: '10px',
                '&:hover': { backgroundColor: COLORS.SECONDARY_HOVER },
                width: '8rem',
              }}
              variant="contained"
              color="secondary"
              type="submit"
              size="large"
            >
              Register

            </Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default Registration;
