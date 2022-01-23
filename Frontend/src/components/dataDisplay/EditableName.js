import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@material-ui/core';
import { Input } from '@mui/material';
import PropTypes from 'prop-types';

const EditableName = ({
  imgSrcEdit, imgSrcSave, nameField, update, objectId,
}) => {
  const [newName, setNewName] = useState(null);
  const [updated, setUpdated] = useState(false);

  const save = (e) => {
    e.stopPropagation();
    update(newName, objectId);
    setNewName(null);
    setUpdated(false);
  };

  return (
    <Typography>
      {!newName && updated === false ? (
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
              setUpdated(true);
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
  update: PropTypes.func.isRequired,
  objectId: PropTypes.number,
};

EditableName.defaultProps = {
  objectId: null,
};

export default EditableName;
