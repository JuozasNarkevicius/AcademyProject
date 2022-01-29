import React, { useContext } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/x.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import { ProgramContext } from '../../Context';
import EditableExercise from './EditableExercise';
import { exerciseService } from '../../services/ExerciseService';

const WorkoutDay = ({ workout }) => {
  const { program, setProgram } = useContext(ProgramContext);

  const addBlankExercise = () => {
    const exercise = {
      id: uuidv4(), name: '', sets: '', reps: '', rest: '',
    };
    const newProgram = program;
    newProgram.workouts.find((w) => w.id === workout.id).exercises.push(exercise);
    setProgram({ ...newProgram });
  };

  // const postExercise = async (exercise) => {
  //   const { id, ...exerciseWithoutId } = exercise;
  //   await exerciseService.addExerciseAPI(workout.id, exerciseWithoutId);
  // };

  const updateExercise = async (editedExercise, exerciseId, isNewExercise) => {
    const newProgram = program;
    const workoutIndex = newProgram.workouts
      .findIndex((w) => w.id === workout.id);
    const exerciseIndex = newProgram.workouts[workoutIndex]
      .exercises.findIndex((e) => e.id === exerciseId);
    newProgram.workouts[workoutIndex]
      .exercises[exerciseIndex] = editedExercise;
    setProgram({ ...newProgram });
    const { id, ...exerciseWithoutId } = editedExercise;
    if (isNewExercise) {
      await exerciseService.addExerciseAPI(workout.id, exerciseWithoutId);
    } else {
      await exerciseService.updateExerciseAPI(workout.id, exerciseId, exerciseWithoutId);
    }
  };

  const deleteExercise = async (exerciseId) => {
    const newProgram = program;
    const newExercisesArray = newProgram.workouts.find((w) => w.id === workout.id).exercises;
    newExercisesArray.splice(newExercisesArray.findIndex((e) => e.id === exerciseId), 1);
    newProgram.workouts.find((w) => w.id === workout.id).exercises = newExercisesArray;
    setProgram({ ...newProgram });
    await exerciseService.deleteExerciseAPI(workout.id, exerciseId);
  };

  return (
    <>
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
                key={e.id}
                exercise={e}
                imgSrcEdit={editIcon}
                imgSrcSave={saveIcon}
                imgSrcDelete={deleteIcon}
                updateExercise={updateExercise}
                deleteExercise={deleteExercise}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{ m: '15px', float: 'left' }} variant="contained" onClick={addBlankExercise}>New exercise</Button>
    </>
  );
};

WorkoutDay.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
        name: PropTypes.string,
        sets: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
        reps: PropTypes.string,
        rest: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
      }),
    ).isRequired,
  }).isRequired,
};

export default WorkoutDay;
