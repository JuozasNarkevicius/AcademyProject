import React, { useState } from 'react';
import {
  IconButton, Input, Icon, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import AlertDialog from '../modal/Modal';
import imgSrcDelete from '../../assets/icons/x.svg';
import COLORS from '../../styles/colors';

const EditableName = ({
  imgSrcEdit, imgSrcSave, nameField, saveNewName, objectId, deleteObject, objectType,
}) => {
  const [newName, setNewName] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (message, variant) => {
    const snackBarStyle = { marginLeft: '12rem' };
    enqueueSnackbar(message, { variant, style: snackBarStyle });
  };

  const save = (e) => {
    e.stopPropagation();
    if (newName) {
      saveNewName(newName, objectId);
      setNewName(null);
      setIsUpdated(false);
    } else {
      setIsUpdated(false);
      handleClickVariant('This field cannot be empty!', 'error');
    }
  };

  return (
    <Box>
      {!newName && isUpdated === false ? (
        <>
          {nameField}
          <IconButton
            sx={{ '&:hover': { backgroundColor: COLORS.BACKGROUND }, ml: '5px' }}
            title="Edit"
            onClick={(e) => {
              setNewName(nameField);
              e.stopPropagation();
            }}
          >
            <Icon>
              <img src={imgSrcEdit} height={23} width={23} alt="k" />
            </Icon>
          </IconButton>
          {objectType === 'program'
            ? (
              <AlertDialog
                deleteObject={() => deleteObject(objectId)}
                id={objectId}
                objectType={objectType}
                imgSrcDelete={imgSrcDelete}
              />
            ) : (
              <AlertDialog
                deleteObject={() => deleteObject(objectId)}
                id={objectId}
                objectType={objectType}
                imgSrcDelete={imgSrcDelete}
              />
            )}
        </>
      ) : (
        <>
          <Input
            autoFocus
            value={newName}
            onClickCapture={(e) => e.stopPropagation()}
            onChange={(e) => {
              setNewName(e.target.value);
              setIsUpdated(true);
            }}
            onKeyPress={(e) => (e.key === 'Enter' && save(e))}
          />
          <IconButton
            title="Save"
            onClick={save}
            sx={{ color: '#fff', '&:hover': { backgroundColor: COLORS.BACKGROUND } }}
          >
            <Icon>
              <img src={imgSrcSave} height={23} width={23} alt="k" style={{ color: 'white' }} />
            </Icon>
          </IconButton>
        </>
      )}
    </Box>
  );
};

EditableName.propTypes = {
  imgSrcEdit: PropTypes.string.isRequired,
  imgSrcSave: PropTypes.string.isRequired,
  nameField: PropTypes.string.isRequired,
  saveNewName: PropTypes.func.isRequired,
  objectId: PropTypes.number.isRequired,
  objectType: PropTypes.string.isRequired,
  deleteObject: PropTypes.func.isRequired,
};

export default EditableName;
