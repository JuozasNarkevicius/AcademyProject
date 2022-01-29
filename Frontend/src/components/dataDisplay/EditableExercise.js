import React, { useState } from 'react';
import {
  TableCell, TableRow, IconButton, Icon, Input,
} from '@mui/material';
import PropTypes from 'prop-types';

const EditableExercise = ({
  exercise, imgSrcEdit, imgSrcSave, imgSrcDelete, updateExercise, deleteExercise,
}) => {
  const [editedExercise, setEditedExercise] = useState({});

  const isString = (id) => typeof id === 'string';
  return (
    editedExercise.id && editedExercise.id === exercise.id ? (
      <TableRow
        key={exercise.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Input type="text" value={editedExercise.name} onChange={(event) => { setEditedExercise({ ...editedExercise, name: event.target.value }); }} />
        </TableCell>
        <TableCell align="right"><Input value={editedExercise.sets} onChange={(event) => { setEditedExercise({ ...editedExercise, sets: event.target.value }); }} /></TableCell>
        <TableCell align="right"><Input value={editedExercise.reps} onChange={(event) => { setEditedExercise({ ...editedExercise, reps: event.target.value }); }} /></TableCell>
        <TableCell align="right"><Input value={editedExercise.rest} onChange={(event) => { setEditedExercise({ ...editedExercise, rest: event.target.value }); }} /></TableCell>
        <TableCell align="right">
          {isString(exercise.id) ? (
            <IconButton
              title="Submit exercise"
              onClick={() => {
                updateExercise(editedExercise, exercise.id, true);
                setEditedExercise({});
              }}
            >
              <Icon>
                <img src={imgSrcSave} height={25} width={25} alt="k" />
              </Icon>
            </IconButton>
          ) : (
            <IconButton
              title="Save exercise"
              onClick={() => {
                updateExercise(editedExercise, exercise.id, false);
                setEditedExercise({});
              }}
            >
              <Icon>
                <img src={imgSrcSave} height={25} width={25} alt="k" />
              </Icon>
            </IconButton>
          )}
          <IconButton title="Delete exercise" onClick={() => deleteExercise(exercise.id)}>
            <Icon>
              <img src={imgSrcDelete} height={20} width={20} alt="k" />
            </Icon>
          </IconButton>
        </TableCell>
      </TableRow>
    ) : (
      <TableRow
        key={exercise.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {exercise.name}
        </TableCell>
        <TableCell align="right">{exercise.sets}</TableCell>
        <TableCell align="right">{exercise.reps}</TableCell>
        <TableCell align="right">{exercise.rest}</TableCell>
        <TableCell align="right">
          <IconButton title="Edit exercise" onClick={() => setEditedExercise(exercise)}>
            <Icon>
              <img src={imgSrcEdit} height={23} width={23} alt="k" />
            </Icon>
          </IconButton>
          <IconButton title="Delete exercise" onClick={() => deleteExercise(exercise.id)}>
            <Icon>
              <img src={imgSrcDelete} height={20} width={20} alt="k" />
            </Icon>
          </IconButton>
        </TableCell>
      </TableRow>
    )
  );
};

EditableExercise.propTypes = {
  exercise: PropTypes.shape({
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
  }).isRequired,
  imgSrcEdit: PropTypes.string.isRequired,
  imgSrcSave: PropTypes.string.isRequired,
  imgSrcDelete: PropTypes.string.isRequired,
  updateExercise: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
};

export default EditableExercise;
