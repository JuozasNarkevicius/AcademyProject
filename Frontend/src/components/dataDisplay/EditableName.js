import React, { useState } from 'react';
import {
  Typography, IconButton, Input, Icon,
} from '@mui/material';
import PropTypes from 'prop-types';

const EditableName = ({
  imgSrcEdit, imgSrcSave, nameField, saveNewName, objectId,
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
    <Typography>
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
          />
          <IconButton title="Save" onClick={save}>
            <Icon>
              <img src={imgSrcSave} height={23} width={23} alt="k" />
            </Icon>
          </IconButton>
        </>
      )}
    </Typography>
  );
};

EditableName.propTypes = {
  imgSrcEdit: PropTypes.string.isRequired,
  imgSrcSave: PropTypes.string.isRequired,
  nameField: PropTypes.string.isRequired,
  saveNewName: PropTypes.func.isRequired,
  objectId: PropTypes.number,
};

EditableName.defaultProps = {
  objectId: null,
};

export default EditableName;
