import {
  Button, Container, TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../services/AuthenticationService';
import ROUTES from '../constants/Routes';

const registationFields = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'age', label: 'Age', type: 'number' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
];

const validationSchema = yup.object({
  firstName: yup.string().required('Enter your first name'),
  lastName: yup.string().required('Enter your last name'),
  age: yup.number().min(1).required('Enter your age'),
  email: yup.string().email('Enter a valid email').required('Enter your email'),
  password: yup.string().min(4).required('Enter your password'),
});

const Registration = () => {
  const navigate = useNavigate();

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
      await authenticationService.registerAPI(values);
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });
  return (
    <Container sx={{ width: '20%', mt: '10%' }}>
      <form onSubmit={formik.handleSubmit}>
        {registationFields.map((r) => (
          <TextField
            sx={{ m: '10px' }}
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
        <Button sx={{ margin: '10px' }} variant="contained" size="large" type="submit">Register</Button>
      </form>
    </Container>
  );
};

export default Registration;
