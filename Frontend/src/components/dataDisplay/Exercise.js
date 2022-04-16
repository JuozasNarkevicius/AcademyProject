import React from 'react';
import {
  TableCell, TableRow, IconButton, Icon,
} from '@mui/material';
import PropTypes from 'prop-types';
import detailsIcon from '../../assets/icons/description.svg';
import COLORS from '../../styles/colors';

const Exercise = ({
  exercise, handleBackdropOpen,
}) => (
  <TableRow
    key={exercise.id}
  >
    <TableCell sx={{ width: '22%', borderColor: 'gray' }} component="th" scope="row">
      {exercise.name}
    </TableCell>
    <TableCell sx={{ width: '22%', borderColor: 'gray' }} align="left">{exercise.sets}</TableCell>
    <TableCell sx={{ width: '22%', borderColor: 'gray' }}>{exercise.reps}</TableCell>
    <TableCell sx={{ width: '26%', borderColor: 'gray' }}>{exercise.rest}</TableCell>
    <TableCell sx={{ borderColor: 'gray' }}>
      <IconButton
        title="View details"
        onClick={() => {
          handleBackdropOpen(true, exercise);
        }}
        sx={{ '&:hover': { backgroundColor: COLORS.BACKGROUND } }}
      >
        <Icon>
          <img src={detailsIcon} height={25} width={25} alt="k" />
        </Icon>
      </IconButton>
    </TableCell>
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
  handleBackdropOpen: PropTypes.func.isRequired,
};
