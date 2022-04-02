import {
  Button, TextField, Container, Card, IconButton, Icon,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import exitIcon from '../../assets/icons/x.svg';

const exerciseFields = [
  { name: 'name', label: 'Exercise name', type: 'text' },
  { name: 'sets', label: 'Sets', type: 'text' },
  { name: 'reps', label: 'Reps', type: 'text' },
  { name: 'rest', label: 'Rest', type: 'text' },
  { name: 'description', label: 'Description', type: 'text' },
  { name: 'videoId', label: 'Video Url', type: 'text' },
];

const validationSchema = yup.object({
  name: yup.string().required('Enter an exercise name'),
  sets: yup.string().required('Enter the number of sets'),
  reps: yup.string().required('Enter the reps for each set'),
  rest: yup.string().required('Enter the amount of rest'),
});

const ExerciseForm = ({ createExercise, setIsBackdropOpen, setIsDraggable }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      sets: '',
      reps: '',
      rest: '',
      description: '',
      videoId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await createExercise(values);
    },
  });
  return (
    <Container>
      <Card>
        <IconButton
          sx={{ float: 'right', m: 1 }}
          title="Exit"
          onClick={() => {
            setIsBackdropOpen(false);
            setIsDraggable(true);
          }}
        >
          <Icon>
            <img src={exitIcon} height={23} width={23} alt="" />
          </Icon>
        </IconButton>
        <form onSubmit={formik.handleSubmit}>
          {exerciseFields.map((field) => (
            <TextField
              sx={{ m: '10px' }}
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
              helperText={formik.touched[field.name] && formik.errors[field.name]}
            />
          ))}
          <Button sx={{ margin: '10px' }} variant="contained" size="large" type="submit">Create exercise</Button>
        </form>
      </Card>
    </Container>
  );
};

ExerciseForm.propTypes = {
  createExercise: PropTypes.func.isRequired,
  setIsBackdropOpen: PropTypes.func.isRequired,
  setIsDraggable: PropTypes.func.isRequired,
};

export default ExerciseForm;
