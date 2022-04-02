/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Backdrop,
} from '@mui/material';
import PropTypes from 'prop-types';
import Exercise from './Exercise';
import ExerciseDetails from './ExerciseDetails';

const WorkoutDay = ({ workout }) => {
  const [IsBackdropOpen, setIsBackdropOpen] = useState(false);
  const [viewedExercise, setViewedExercise] = useState({});

  const handleBackdropOpen = (isOpen, exercise) => {
    setIsBackdropOpen(isOpen);
    setViewedExercise(exercise);
  };

  return (
    <>
      <TableContainer component={Paper}>
        {workout.exercises.length ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Exercise name</TableCell>
                <TableCell>Sets</TableCell>
                <TableCell>Reps</TableCell>
                <TableCell>Rest (seconds)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workout.exercises.map((exercise) => (
                <Exercise
                  key={exercise.id}
                  exercise={exercise}
                  handleBackdropOpen={handleBackdropOpen}
                />
              ))}
            </TableBody>
          </Table>
        ) : <Typography>This workout has no exercises.</Typography>}
      </TableContainer>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={IsBackdropOpen}
      >
        <ExerciseDetails exercise={viewedExercise} setIsBackdropOpen={setIsBackdropOpen} />
      </Backdrop>
    </>

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
