import React, { useState } from 'react';
import {
  TableCell, TableRow, IconButton, Icon, Input,
} from '@mui/material';
import PropTypes from 'prop-types';
import AlertDialog from './Modal';

const EditableExercise = ({
  exercise, imgSrcEdit, imgSrcSave, imgSrcDelete, updateExercise, deleteExercise, objectType,
}) => {
  const [editedExercise, setEditedExercise] = useState({});

  const submitUpdatedExercise = () => {
    updateExercise(editedExercise, exercise.id);
    setEditedExercise({});
  };
  return (
    editedExercise.id && editedExercise.id === exercise.id ? (
      <TableRow
        key={exercise.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Input
            onKeyPress={(e) => (e.key === 'Enter' && submitUpdatedExercise())}
            value={editedExercise.name}
            onChange={(event) => {
              setEditedExercise({
                ...editedExercise,
                name: event.target.value,
              });
            }}
          />
        </TableCell>
        <TableCell>
          <Input
            onKeyPress={(e) => (e.key === 'Enter' && submitUpdatedExercise())}
            value={editedExercise.sets}
            onChange={(event) => {
              setEditedExercise({
                ...editedExercise,
                sets: event.target.value,
              });
            }}
          />

        </TableCell>
        <TableCell>
          <Input
            onKeyPress={(e) => (e.key === 'Enter' && submitUpdatedExercise())}
            value={editedExercise.reps}
            onChange={(event) => {
              setEditedExercise({
                ...editedExercise,
                reps: event.target.value,
              });
            }}
          />

        </TableCell>
        <TableCell>
          <Input
            onKeyPress={(e) => (e.key === 'Enter' && submitUpdatedExercise())}
            value={editedExercise.rest}
            onChange={(event) => {
              setEditedExercise({
                ...editedExercise,
                rest: event.target.value,
              });
            }}
          />

        </TableCell>
        <TableCell align="right">
          <IconButton
            title="Submit exercise"
            onClick={submitUpdatedExercise}
          >
            <Icon>
              <img src={imgSrcSave} height={25} width={25} alt="k" />
            </Icon>
          </IconButton>
          <AlertDialog
            deleteObject={deleteExercise}
            id={exercise.id}
            objectType={objectType}
            imgSrcDelete={imgSrcDelete}
          />
        </TableCell>
      </TableRow>
    ) : (
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
        <TableCell align="right">
          <IconButton title="Edit exercise" onClick={() => setEditedExercise(exercise)}>
            <Icon>
              <img src={imgSrcEdit} height={23} width={23} alt="k" />
            </Icon>
          </IconButton>
          <AlertDialog
            deleteObject={deleteExercise}
            id={exercise.id}
            objectType={objectType}
            imgSrcDelete={imgSrcDelete}
          />
        </TableCell>
      </TableRow>
    )
  );
};

EditableExercise.propTypes = {
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
  imgSrcEdit: PropTypes.string.isRequired,
  imgSrcSave: PropTypes.string.isRequired,
  imgSrcDelete: PropTypes.string.isRequired,
  updateExercise: PropTypes.func.isRequired,
  objectType: PropTypes.string.isRequired,
  deleteExercise: PropTypes.func.isRequired,
};

export default EditableExercise;
