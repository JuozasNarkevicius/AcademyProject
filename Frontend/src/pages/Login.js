import React, { useState } from 'react';
import {
  Button, Container, TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import baseAdress from '../API/BaseAddress';

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
        <TextField
          sx={{ margin: '10px' }}
          name="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={{ margin: '10px' }}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {error && <div>{error}</div>}
        <Button sx={{ margin: '10px' }} variant="contained" size="large" type="submit">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
