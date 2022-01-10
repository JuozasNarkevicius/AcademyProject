import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Button, FormControl, TextField, Container,
} from '@mui/material';
import PropTypes from 'prop-types';

const WorkoutDay = ({ workoutId, setProgramValues }) => {
  const [workout, setWorkout] = useState({ id: workoutId, name: '', exercises: [] });

  const addExercise = () => {
    const newWorkout = workout;
    newWorkout.exercises.push({ id: uuidv4() });
    setWorkout({ ...newWorkout });
  };

  const updateExerciseValue = (exercise, event) => {
    const index = workout.exercises.indexOf(exercise);
    const newExercisesArray = [...workout.exercises];
    newExercisesArray[index][event.target.name] = event.target.value;
    setWorkout({ ...workout, exercises: newExercisesArray });
  };

  useEffect(() => {
    setProgramValues(workout);
  }, [workout]);

  return (
    <Container>
      <FormControl>
        <div>
          <TextField label="Workout name" variant="outlined" onChange={(event) => { setWorkout({ ...workout, name: event.target.value }); }} />
          {workout.exercises.map((exercise) => (
            <div key={exercise.id}>
              <TextField name="name" type="text" label="Exercise name" variant="outlined" onChange={(event) => updateExerciseValue(exercise, event)} />
              <TextField name="sets" type="number" label="Sets" variant="outlined" onChange={(event) => updateExerciseValue(exercise, event)} />
              <TextField name="reps" type="text" label="Reps" variant="outlined" onChange={(event) => updateExerciseValue(exercise, event)} />
              <TextField name="rest" type="number" label="Rest" variant="outlined" onChange={(event) => updateExerciseValue(exercise, event)} />
            </div>
          ))}
        </div>
        <Button variant="contained" onClick={addExercise}>Add new exercise</Button>
      </FormControl>
    </Container>
  );
};

WorkoutDay.propTypes = {
  workoutId: PropTypes.string.isRequired,
  setProgramValues: PropTypes.func.isRequired,
};

export default WorkoutDay;
