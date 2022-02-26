import React from 'react';
import {
  TableCell, TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';

const Exercise = ({
  exercise,
}) => (
  <TableRow
    key={exercise.id}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell sx={{ width: '22%' }} component="th" scope="row">
      {exercise.name}
    </TableCell>
    <TableCell sx={{ width: '22%' }} align="left">{exercise.sets}</TableCell>
    <TableCell sx={{ width: '22%' }}>{exercise.reps}</TableCell>
    <TableCell sx={{ width: '22%' }}>{exercise.rest}</TableCell>
  </TableRow>
);

export default Exercise;

Exercise.propTypes = {
  exercise: PropTypes.shape({
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
  }).isRequired,
};
