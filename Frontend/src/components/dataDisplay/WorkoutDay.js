import React, { useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@material-ui/core';
import { Input } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/x.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import ProgramContext from '../../Context';
import baseAdress from '../../API/BaseAddress';

const WorkoutDay = ({ workout }) => {
  const { program, setProgram } = useContext(ProgramContext);
  const [editedExercise, setEditedExercise] = useState({});

  const saveExercise = async (workoutId, exerciseId) => {
    const newProgram = program;
    const workoutIndex = newProgram.workouts
      .findIndex((w) => w.id === workoutId);
    const exerciseIndex = newProgram.workouts[workoutIndex]
      .exercises.findIndex((e) => e.id === exerciseId);
    newProgram.workouts[workoutIndex]
      .exercises[exerciseIndex] = editedExercise;
    setProgram({ ...newProgram });
    setEditedExercise({});
    const { id, ...newExercise } = editedExercise;
    await axios.put(`${baseAdress}/workouts/${workoutId}/exercises/${exerciseId}`, newExercise);
  };

  const deleteExercise = async (workoutId, exerciseId) => {
    const newProgram = program;
    const newExercisesArray = newProgram.workouts.find((w) => w.id === workoutId).exercises;
    newExercisesArray.splice(newExercisesArray.findIndex((e) => e.id === exerciseId), 1);
    newProgram.workouts.find((w) => w.id === workoutId).exercises = newExercisesArray;
    setProgram({ ...newProgram });
    await axios.delete(`${baseAdress}/workouts/${workoutId}/exercises/${exerciseId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exercise name</TableCell>
            <TableCell align="right">Sets</TableCell>
            <TableCell align="right">Reps</TableCell>
            <TableCell align="right">Rest</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {workout.exercises.map((e) => (
            editedExercise.id && editedExercise.id === e.id ? (
              <TableRow
                key={e.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Input type="text" value={editedExercise.name} onChange={(event) => { setEditedExercise({ ...editedExercise, name: event.target.value }); }} />
                </TableCell>
                <TableCell align="right"><Input value={editedExercise.sets} onChange={(event) => { setEditedExercise({ ...editedExercise, sets: event.target.value }); }} /></TableCell>
                <TableCell align="right"><Input value={editedExercise.reps} onChange={(event) => { setEditedExercise({ ...editedExercise, reps: event.target.value }); }} /></TableCell>
                <TableCell align="right"><Input value={editedExercise.rest} onChange={(event) => { setEditedExercise({ ...editedExercise, rest: event.target.value }); }} /></TableCell>
                <TableCell align="right">
                  <IconButton title="Save exercise" onClick={() => saveExercise(workout.id, e.id)}>
                    <Icon>
                      <img src={saveIcon} height={25} width={25} alt="k" />
                    </Icon>
                  </IconButton>
                  <IconButton title="Delete exercise" onClick={() => deleteExercise(workout.id, e.id)}>
                    <Icon>
                      <img src={deleteIcon} height={20} width={20} alt="k" />
                    </Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow
                key={e.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {e.name}
                </TableCell>
                <TableCell align="right">{e.sets}</TableCell>
                <TableCell align="right">{e.reps}</TableCell>
                <TableCell align="right">{e.rest}</TableCell>
                <TableCell align="right">
                  <IconButton title="Edit exercise" onClick={() => setEditedExercise(e)}>
                    <Icon>
                      <img src={editIcon} height={23} width={23} alt="k" />
                    </Icon>
                  </IconButton>
                  <IconButton title="Delete exercise" onClick={() => deleteExercise(workout.id, e.id)}>
                    <Icon>
                      <img src={deleteIcon} height={20} width={20} alt="k" />
                    </Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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
};

export default WorkoutDay;
