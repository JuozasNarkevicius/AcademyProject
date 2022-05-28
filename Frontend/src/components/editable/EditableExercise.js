import React, { useState } from 'react';
import {
  TableCell, IconButton, Icon, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import AlertDialog from '../modal/Modal';
import detailsIcon from '../../assets/icons/description.svg';
import COLORS from '../../styles/colors';

const EditableExercise = ({
  exercise, imgSrcEdit, imgSrcSave,
  updateExercise, deleteExercise, objectType, handleBackdropOpen,
}) => {
  const [editedExercise, setEditedExercise] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (message, variant) => {
    const snackBarStyle = { marginLeft: '12rem' };
    enqueueSnackbar(message, { variant, style: snackBarStyle });
  };

  const submitUpdatedExercise = () => {
    console.log(editedExercise);
    if (editedExercise.name && editedExercise.sets
      && editedExercise.reps && editedExercise.rest) {
      updateExercise(editedExercise, exercise.id);
      setEditedExercise({});
    } else {
      handleClickVariant('All fields are required!', 'error');
    }
  };
  return (
    editedExercise.id && editedExercise.id === exercise.id ? (
      <>
        <TableCell component="th" scope="row">
          <TextField
            variant="standard"
            onKeyPress={(e) => (e.key === 'Enter' && submitUpdatedExercise())}
            value={editedExercise.name}
            type="text"
            onChange={(event) => {
              setEditedExercise({
                ...editedExercise,
                name: event.target.value,
              });
            }}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            variant="standard"
            InputProps={{
              inputProps: { min: 1 },
            }}
            onKeyPress={(e) => ((e.key === 'Enter' && submitUpdatedExercise()) || (e.code === 'Minus' && e.preventDefault()))}
            value={editedExercise.sets}
            onChange={(event) => {
              setEditedExercise({
                ...editedExercise,
                sets: event.target.value.replace(/^0+/, ''),
              });
            }}
          />

        </TableCell>
        <TableCell>
          <TextField
            variant="standard"
            onKeyPress={(e) => (e.key === 'Enter' && submitUpdatedExercise())}
            value={editedExercise.reps}
            type="text"
            onChange={(event) => {
              setEditedExercise({
                ...editedExercise,
                reps: event.target.value,
              });
            }}
          />

        </TableCell>
        <TableCell>
          <TextField
            required
            variant="standard"
            onKeyPress={(e) => ((e.key === 'Enter' && submitUpdatedExercise()) || (e.code === 'Minus' && e.preventDefault()))}
            value={editedExercise.rest}
            type="number"
            InputProps={{
              inputProps: { min: 1 },
            }}
            onChange={(event) => {
              setEditedExercise({
                ...editedExercise,
                rest: event.target.value.replace(/^0+/, ''),
              });
            }}
          />

        </TableCell>
        <TableCell align="right">
          <IconButton
            sx={{ '&:hover': { backgroundColor: COLORS.BACKGROUND } }}
            title="Submit exercise"
            onClick={submitUpdatedExercise}
          >
            <Icon>
              <img src={imgSrcSave} height={25} width={25} alt="k" />
            </Icon>
          </IconButton>
        </TableCell>
      </>
    ) : (
      <>
        <TableCell sx={{ width: '22%', borderBottomColor: 'gray' }} component="th" scope="row">
          {exercise.name}
        </TableCell>
        <TableCell sx={{ width: '22%', borderBottomColor: 'gray' }} align="left">{exercise.sets}</TableCell>
        <TableCell sx={{ width: '22%', borderBottomColor: 'gray' }}>{exercise.reps}</TableCell>
        <TableCell sx={{ width: '20%', borderBottomColor: 'gray' }}>{exercise.rest}</TableCell>
        <TableCell sx={{ borderBottomColor: 'gray' }} align="right">
          <IconButton
            sx={{ '&:hover': { backgroundColor: COLORS.BACKGROUND } }}
            title="View details"
            onClick={() => {
              handleBackdropOpen(true, true, exercise);
            }}
          >
            <Icon>
              <img src={detailsIcon} height={25} width={25} alt="k" />
            </Icon>
          </IconButton>
          <IconButton
            sx={{ '&:hover': { backgroundColor: COLORS.BACKGROUND } }}
            title="Edit exercise"
            onClick={() => setEditedExercise(exercise)}
          >
            <Icon>
              <img src={imgSrcEdit} height={23} width={23} alt="k" />
            </Icon>
          </IconButton>
          <AlertDialog
            deleteObject={() => deleteExercise(exercise.id)}
            id={exercise.id}
            objectType={objectType}
          />
        </TableCell>
      </>
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
  updateExercise: PropTypes.func.isRequired,
  objectType: PropTypes.string.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  handleBackdropOpen: PropTypes.func.isRequired,
};

export default EditableExercise;
