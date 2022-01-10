import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
  Button, FormControl, TextField, Container,
} from '@mui/material';
import WorkoutDay from './WorkoutDay';
import BaseAdress from '../API/BaseAddress';

const ProgramForm = () => {
  const [program, setProgram] = useState({ name: '', workouts: [] });

  const addWorkout = () => {
    const newProgram = program;
    newProgram.workouts.push({ id: uuidv4() });
    setProgram({ ...newProgram });
  };

  const setProgramValues = (workout) => {
    const newWorkouts = program.workouts;
    newWorkouts[program.workouts.findIndex((w) => w.id === workout.id)] = workout;
    setProgram({ ...program, workouts: newWorkouts });
  };

  const handleProgramSubmit = async () => {
    await axios.post(`${BaseAdress}/users/1/programs`, program);
  };

  return (
    <Container>
      <FormControl>
        <TextField id="outlined-basic" label="Program name" variant="outlined" onChange={(event) => { setProgram({ ...program, name: event.target.value }); }} />
        <Button variant="contained" onClick={addWorkout}>Add new workout</Button>
        {program.workouts.map((w) => (
          <div key={w.id}>
            <WorkoutDay workoutId={w.id} setProgramValues={setProgramValues} />
            <Button variant="contained" type="button">Delete workout</Button>
          </div>
        ))}
        <Button variant="contained" onClick={handleProgramSubmit}>Finalize program</Button>
      </FormControl>
    </Container>
  );
};
export default ProgramForm;
