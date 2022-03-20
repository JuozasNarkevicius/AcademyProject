import {
  Button, Container, TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/Routes';
import applicationService from '../services/ApplicationService';
import userService from '../services/UserService';

const ApplicationFields = [
  { name: 'description', label: 'Description', type: 'text' },
  { name: 'qualifications', label: 'Qualifications', type: 'text' },
  { name: 'profileImage', label: 'Profile image', type: 'text' },
  { name: 'phoneNumber', label: 'Phone number', type: 'text' },
];

const validationSchema = yup.object({
  description: yup.string().required('Enter a description'),
  qualifications: yup.string().required('Enter your qualifications'),
  profileImage: yup.string().required('Please upload an image'),
  phoneNumber: yup.string().required('Enter your phone number'),
});

const TrainerApplication = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      description: '',
      qualifications: '',
      profileImage: '',
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await userService.getCurrentUserAPI();
      await applicationService.postApplicationAPI({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        ...values,
      });
      navigate(ROUTES.TRAINERS, { replace: true });
    },
  });
  return (
    <Container sx={{ width: '20rem', mt: '7rem' }}>
      <form onSubmit={formik.handleSubmit}>
        {ApplicationFields.map((r) => (
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
        <Button sx={{ margin: '10px' }} variant="contained" size="large" type="submit">Apply</Button>
      </form>
    </Container>
  );
};

export default TrainerApplication;
