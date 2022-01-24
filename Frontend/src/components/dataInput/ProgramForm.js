import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Button, FormControl, TextField, Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkoutDay from './WorkoutDay';
import { programService } from '../../services/ProgramService';
import ROUTES from '../../constants/Routes';

const ProgramForm = () => {
  const [program, setProgram] = useState({ name: '', workouts: [] });
  const navigate = useNavigate();

  const addWorkout = () => {
    const newProgram = program;
    newProgram.workouts.push({ id: uuidv4(), name: '', exercises: [] });
    setProgram({ ...newProgram });
  };

  const deleteWorkout = (workoutId) => {
    const newProgram = program;
    newProgram.workouts.splice(program.workouts.findIndex((w) => w.id === workoutId), 1);
    setProgram({ ...newProgram });
  };

  const addExercise = (workoutId) => {
    const newProgram = program;
    newProgram.workouts.find((w) => w.id === workoutId).exercises.push({ id: uuidv4() });
    setProgram({ ...newProgram });
  };

  const deleteExercise = (workoutId, exerciseId) => {
    const newProgram = program;
    const newExercisesArray = newProgram.workouts.find((w) => w.id === workoutId).exercises;
    newExercisesArray.splice(newExercisesArray.findIndex((e) => e.id === exerciseId), 1);
    newProgram.workouts.find((w) => w.id === workoutId).exercises = newExercisesArray;
    setProgram({ ...newProgram });
  };

  const setWorkoutName = (workoutId, workoutName) => {
    const newProgram = program;
    newProgram.workouts.find((w) => w.id === workoutId).name = workoutName;
    setProgram({ ...newProgram });
  };

  const updateExerciseValue = (workoutId, exerciseId, event) => {
    const newProgram = program;
    newProgram
      .workouts.find((w) => w.id === workoutId)
      .exercises.find((e) => e.id === exerciseId)[event.target.name] = event.target.value;
    setProgram({ ...newProgram });
  };

  const handleProgramSubmit = async () => {
    await programService.submitProgramAPI(program);
    navigate(ROUTES.SPORT, { replace: true });
  };

  return (
    <Container>
      <FormControl>
        <TextField id="outlined-basic" label="Program name" variant="outlined" onChange={(event) => { setProgram({ ...program, name: event.target.value }); }} />
        <Button variant="contained" onClick={addWorkout}>Add new workout</Button>
        {program.workouts.map((workout) => (
          <div key={workout.id}>
            <WorkoutDay
              workout={workout}
              addExercise={addExercise}
              deleteExercise={deleteExercise}
              setWorkoutName={setWorkoutName}
              updateExerciseValue={updateExerciseValue}
            />
            <Button variant="contained" color="error" onClick={() => deleteWorkout(workout.id)}>Delete workout</Button>
          </div>
        ))}
        <Button variant="contained" onClick={handleProgramSubmit}>Finalize program</Button>
      </FormControl>
    </Container>
  );
};
export default ProgramForm;
