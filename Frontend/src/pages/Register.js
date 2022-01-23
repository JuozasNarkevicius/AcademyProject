import {
  Button, Container, TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import baseAdress from '../API/BaseAddress';

const validationSchema = yup.object({
  firstName: yup.string().required('Enter your first name'),
  lastName: yup.string().required('Enter your last name'),
  age: yup.number().min(1).required('Enter your age'),
  email: yup.string().email('Enter a valid email').required('Enter your email'),
  password: yup.string().min(4).required('Enter your password'),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await axios.post(`${baseAdress}/users`, values)
        .then((results) => console.log(results.data)); // to be changed
    },
  });
  return (
    <Container sx={{ width: '20%', mt: '10%' }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ margin: '10px' }}
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          sx={{ margin: '10px' }}
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          sx={{ margin: '10px' }}
          name="age"
          label="Age"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
        />
        <TextField
          sx={{ margin: '10px' }}
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={{ margin: '10px' }}
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button sx={{ margin: '10px' }} variant="contained" size="large" type="submit">Register</Button>
      </form>
    </Container>
  );
};

export default Register;
