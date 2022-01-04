import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, FormControl, TextField, Container,
} from '@mui/material';
import WorkoutDay from './WorkoutDay';
import BaseAdress from '../API/BaseAddress';

const ProgramForm = () => {
  const [programName, setProgramName] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const addWorkout = () => {
    setWorkouts([...workouts, {}]);
  };

  const handleProgramSubmit = async () => {
    await axios.post(`${BaseAdress}/users/1/programs`, { name: programName, workouts });
  };

  return (
    <Container>
      <FormControl>
        <TextField id="outlined-basic" label="Program name" variant="outlined" onChange={(event) => { setProgramName(event.target.value); }} />
        <Button variant="contained" onClick={addWorkout}>Add new workout</Button>
        {workouts.map((w) => (
          <div key={workouts.indexOf(w)}>
            <WorkoutDay data={w} />
            <Button variant="contained" type="button">Delete workout</Button>
          </div>
        ))}
        <Button variant="contained" onClick={handleProgramSubmit}>Finalize program</Button>
      </FormControl>
    </Container>
  );
};
export default ProgramForm;
