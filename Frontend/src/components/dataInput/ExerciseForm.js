import {
  Button, TextField, Container, Card, IconButton, Icon,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import exitIcon from '../../assets/icons/x.svg';
import COLORS from '../../styles/colors';
import EXERCISE_FIELDS from '../../constants/ExerciseFields';

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
      videoUrl: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await createExercise(values);
    },
  });
  return (
    <Container>
      <Card sx={{ backgroundColor: COLORS.ITEM }}>
        <IconButton
          sx={{
            float: 'right',
            m: 1,
            '&:hover': { backgroundColor: COLORS.BACKGROUND },
          }}
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
          {EXERCISE_FIELDS.map((field) => (
            <TextField
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              variant="filled"
              sx={{
                m: '10px', backgroundColor: COLORS.BACKGROUND, color: 'white', width: field.width,
              }}
              multiline={field.multiline}
              maxRows={4}
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
          <Button sx={{ margin: '1.1rem', backgroundColor: COLORS.SECONDARY, '&:hover': { backgroundColor: COLORS.SECONDARY_HOVER } }} variant="contained" size="large" type="submit">Create exercise</Button>
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
