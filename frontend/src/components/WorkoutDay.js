/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Button, FormControl, TextField, Container,
} from '@mui/material';

const WorkoutDay = ({ data }) => {
  const [workoutName, setWorkoutName] = useState([]);
  const [exercises, setExercises] = useState([]);
  const addExercise = () => {
    setExercises([...exercises, {}]);
  };

  const updateExerciseValue = (exercise, valueToUpdate, newValue) => {
    const index = exercises.indexOf(exercise);
    const newExercisesArray = [...exercises];
    switch (valueToUpdate) {
    case 'name':
      newExercisesArray[index] = { ...newExercisesArray[index], name: newValue };
      break;
    case 'sets':
      newExercisesArray[index] = { ...newExercisesArray[index], sets: newValue };
      break;
    case 'reps':
      newExercisesArray[index] = { ...newExercisesArray[index], reps: newValue };
      break;
    default:
      newExercisesArray[index] = { ...newExercisesArray[index], rest: newValue };
    }
    setExercises(newExercisesArray);
  };

  data.exercises = exercises;
  data.name = workoutName;

  return (
    <Container>
      <FormControl>
        <div>
          <TextField id="outlined-basic" label="Workout name" variant="outlined" onChange={(event) => { setWorkoutName(event.target.value); }} />
          {exercises.map((exercise) => (
            <div key={exercises.indexOf(exercise)}>
              <TextField id="outlined-basic" label="Exercise name" variant="outlined" onChange={(event) => { updateExerciseValue(exercise, 'name', event.target.value); }} />
              <TextField id="outlined-basic" type="number" label="Sets" variant="outlined" onChange={(event) => { updateExerciseValue(exercise, 'sets', event.target.value); }} />
              <TextField id="outlined-basic" type="text" label="Reps" variant="outlined" onChange={(event) => { updateExerciseValue(exercise, 'reps', event.target.value); }} />
              <TextField id="outlined-basic" type="number" label="Rest" variant="outlined" onChange={(event) => { updateExerciseValue(exercise, 'rest', event.target.value); }} />
            </div>
          ))}
        </div>
        <Button variant="contained" onClick={addExercise}>Add new exercise</Button>
      </FormControl>
    </Container>
  );
};

export default WorkoutDay;
