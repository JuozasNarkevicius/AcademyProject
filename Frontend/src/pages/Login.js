import React from 'react';
import {
  Button, Container, TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../services/AuthenticationService';
import ROUTES from '../constants/Routes';

const loginFields = [
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
];

const validationSchema = yup.object({
  email: yup.string().required('Enter your email'),
  password: yup.string().required('Enter your password'),
});

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await authenticationService.loginAPI(values);
      navigate(ROUTES.SPORT, { replace: true });
    },
  });
  return (
    <Container>
      <form sx={{ mt: '20%' }} onSubmit={formik.handleSubmit}>
        {loginFields.map((login) => (
          <TextField
            sx={{ m: '10px' }}
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
        <Button sx={{ margin: '10px' }} variant="contained" size="large" type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
