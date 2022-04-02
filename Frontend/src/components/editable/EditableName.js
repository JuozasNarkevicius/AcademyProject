import React, { useState } from 'react';
import {
  IconButton, Input, Icon, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import AlertDialog from '../dataDisplay/Modal';
import imgSrcDelete from '../../assets/icons/x.svg';

const EditableName = ({
  imgSrcEdit, imgSrcSave, nameField, saveNewName, objectId, deleteObject, objectType,
}) => {
  const [newName, setNewName] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const save = (e) => {
    e.stopPropagation();
    saveNewName(newName, objectId);
    setNewName(null);
    setIsUpdated(false);
  };

  return (
    <Box>
      {!newName && isUpdated === false ? (
        <>
          {nameField}
          <IconButton
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
            value={newName}
            onClickCapture={(e) => e.stopPropagation()}
            onChange={(e) => {
              setNewName(e.target.value);
              setIsUpdated(true);
            }}
            onKeyPress={(e) => (e.key === 'Enter' && save(e))}
          />
          <IconButton title="Save" onClick={save}>
            <Icon>
              <img src={imgSrcSave} height={23} width={23} alt="k" />
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
