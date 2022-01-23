import React, { useContext } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import PropTypes from 'prop-types';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/x.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import ProgramContext from '../../Context';
import API from '../../API/API';
import EditableExercise from './EditableExercise';

const WorkoutDay = ({ workout }) => {
  const { program, setProgram } = useContext(ProgramContext);

  const saveExercise = async (editedExercise, exerciseId) => {
    const newProgram = program;
    const workoutIndex = newProgram.workouts
      .findIndex((w) => w.id === workout.id);
    const exerciseIndex = newProgram.workouts[workoutIndex]
      .exercises.findIndex((e) => e.id === exerciseId);
    newProgram.workouts[workoutIndex]
      .exercises[exerciseIndex] = editedExercise;
    setProgram({ ...newProgram });
    const { id, ...newExercise } = editedExercise;
    await API.put(`/workouts/${workout.id}/exercises/${exerciseId}`, newExercise);
  };

  const deleteExercise = async (exerciseId) => {
    const newProgram = program;
    const newExercisesArray = newProgram.workouts.find((w) => w.id === workout.id).exercises;
    newExercisesArray.splice(newExercisesArray.findIndex((e) => e.id === exerciseId), 1);
    newProgram.workouts.find((w) => w.id === workout.id).exercises = newExercisesArray;
    setProgram({ ...newProgram });
    await API.delete(`/workouts/${workout.id}/exercises/${exerciseId}`);
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
            <EditableExercise
              exercise={e}
              imgSrcEdit={editIcon}
              imgSrcSave={saveIcon}
              imgSrcDelete={deleteIcon}
              saveExercise={saveExercise}
              deleteExercise={deleteExercise}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

WorkoutDay.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sets: PropTypes.number,
        reps: PropTypes.string,
        rest: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
};

export default WorkoutDay;
