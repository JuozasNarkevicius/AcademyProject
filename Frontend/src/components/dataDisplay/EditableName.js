import React, { useState } from 'react';
import {
  IconButton, Input, Icon,
} from '@mui/material';
import PropTypes from 'prop-types';

const EditableName = ({
  imgSrcEdit, imgSrcSave, imgSrcDelete, nameField, saveNewName, objectId, deleteObject,
}) => {
  const [newName, setNewName] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  // const isString = (id) => typeof id === 'string';

  const save = (e) => {
    e.stopPropagation();
    // if (isString(objectId)) {
    //   saveNewName(newName, objectId, true);
    // } else {
    //   saveNewName(newName, objectId, false);
    // }
    saveNewName(newName, objectId);
    setNewName(null);
    setIsUpdated(false);
  };

  return (
    <div>
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
          <IconButton title="Delete" onClick={() => deleteObject(objectId)}>
            <Icon>
              <img src={imgSrcDelete} height={23} width={23} alt="k" />
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
    </div>
  );
};

EditableName.propTypes = {
  imgSrcEdit: PropTypes.string.isRequired,
  imgSrcSave: PropTypes.string.isRequired,
  imgSrcDelete: PropTypes.string.isRequired,
  nameField: PropTypes.string.isRequired,
  saveNewName: PropTypes.func.isRequired,
  objectId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  deleteObject: PropTypes.func.isRequired,
};

EditableName.defaultProps = {
  objectId: null,
};

export default EditableName;
