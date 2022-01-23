import React, { useState } from 'react';
import {
  Button, Container, TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import baseAdress from '../API/BaseAddress';

const loginFields = [
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
];

const validationSchema = yup.object({
  email: yup.string().required('Enter your email'),
  password: yup.string().required('Enter your password'),
});

const Login = () => {
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios.post(`${baseAdress}/login`, values, { withCredentials: true })
        .then((results) => console.log(results.data)) // to be changed
        .catch(() => setError('Wrong login credentials'));
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
        {error && <div>{error}</div>}
        <Button sx={{ margin: '10px' }} variant="contained" size="large" type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
