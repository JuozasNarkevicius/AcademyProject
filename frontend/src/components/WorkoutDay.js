/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Button, FormControl, TextField, Container,
} from '@mui/material';

const WorkoutDay = ({ workout }) => {
  const [workoutName, setWorkoutName] = useState([]);
  const [exercises, setExercises] = useState([]);
  const addExercise = () => {
    setExercises([...exercises, {}]);
  };

  const updateExerciseValue = (exercise, event) => {
    const index = exercises.indexOf(exercise);
    const newExercisesArray = [...exercises];
    newExercisesArray[index][event.target.name] = event.target.value;
    setExercises(newExercisesArray);
  };

  workout.exercises = exercises;
  workout.name = workoutName;

  return (
    <Container>
      <FormControl>
        <div>
          <TextField label="Workout name" variant="outlined" onChange={(event) => { setWorkoutName(event.target.value); }} />
          {exercises.map((exercise, index) => (
            <div key={index}>
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

export default WorkoutDay;
