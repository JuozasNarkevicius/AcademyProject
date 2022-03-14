import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import Exercise from './Exercise';

const WorkoutDay = ({ workout }) => (
  <TableContainer component={Paper}>
    {workout.exercises.length ? (
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exercise name</TableCell>
            <TableCell>Sets</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>Rest (seconds)</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {workout.exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </TableBody>
      </Table>
    ) : <Typography>This workout has no exercises.</Typography>}
  </TableContainer>
);

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
