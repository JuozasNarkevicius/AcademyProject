import React, { useContext, useState } from 'react';
import {
  Button, Container, TextField, Typography, Box, CssBaseline,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../services/AuthenticationService';
import ROUTES from '../constants/Routes';
import { AuthorizationContext } from '../Context';

const loginFields = [
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
];

const validationSchema = yup.object({
  email: yup.string().required('Enter your email'),
  password: yup.string().required('Enter your password'),
});

const Login = () => {
  const { setIsLoggedIn, setRole } = useContext(AuthorizationContext);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await authenticationService.loginAPI(values).catch(() => setError('Wrong login credentials'));
      sessionStorage.setItem('auth', 'true');
      sessionStorage.setItem('id', response.data.id);
      sessionStorage.setItem('role', response.data.role);
      setIsLoggedIn(sessionStorage.getItem('auth'));
      setRole(sessionStorage.getItem('role'));
      navigate(ROUTES.MY_PROGRAMS, { replace: true });
    },
  });
  return (
    <Container sx={{ minWidth: '100%', minHeight: '100vh', paddingTop: '5rem' }}>
      <CssBaseline />
      <Box sx={{
        display: 'flex', justifyContent: 'center', marginTop: '10vh',
      }}
      >
        <form onSubmit={formik.handleSubmit} style={{ maxWidth: '20rem' }}>
          {loginFields.map((login) => (
            <TextField
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              variant="filled"
              sx={{
                m: '10px', backgroundColor: '#2d2b2b', color: 'white',
              }}
              key={login.name}
              name={login.name}
              label={login.label}
              type={login.type}
              value={formik.values[login.name]}
              onChange={formik.handleChange}
              error={formik.touched[login.name] && Boolean(formik.errors[login.name])}
              helperText={formik.touched[login.name] && formik.errors[login.name]}
            />
          ))}
          <Typography sx={{ color: 'red' }}>{error}</Typography>
          <Button sx={{ margin: '10px' }} variant="contained" color="secondary" size="large" type="submit">Login</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
