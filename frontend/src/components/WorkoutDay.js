import {
  Button, FormControl, TextField, Container,
} from '@mui/material';
import PropTypes from 'prop-types';

const WorkoutDay = ({
  workout, addExercise,
  deleteExercise, setWorkoutName,
  updateExerciseValue,
}) => (
  <Container>
    <FormControl>
      <TextField label="Workout name" variant="outlined" onChange={(event) => { setWorkoutName(workout.id, event.target.value); }} />
      {workout.exercises.map((exercise) => (
        <div key={exercise.id}>
          <TextField name="name" type="text" label="Exercise name" variant="outlined" onChange={(event) => updateExerciseValue(workout.id, exercise.id, event)} />
          <TextField name="sets" type="number" label="Sets" variant="outlined" onChange={(event) => updateExerciseValue(workout.id, exercise.id, event)} />
          <TextField name="reps" type="text" label="Reps" variant="outlined" onChange={(event) => updateExerciseValue(workout.id, exercise.id, event)} />
          <TextField name="rest" type="number" label="Rest" variant="outlined" onChange={(event) => updateExerciseValue(workout.id, exercise.id, event)} />
          <Button variant="contained" color="error" onClick={() => deleteExercise(workout.id, exercise.id)}>Delete exercise</Button>
        </div>
      ))}
      <Button variant="contained" onClick={() => addExercise(workout.id)}>Add new exercise</Button>
    </FormControl>
  </Container>
);

WorkoutDay.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        sets: PropTypes.string,
        reps: PropTypes.string,
        rest: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  addExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  setWorkoutName: PropTypes.func.isRequired,
  updateExerciseValue: PropTypes.func.isRequired,
};

export default WorkoutDay;
