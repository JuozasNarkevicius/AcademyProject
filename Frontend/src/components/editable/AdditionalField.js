import React, { useState } from 'react';
import {
  Card, IconButton, Icon, Button, Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import Form from '../dataInput/Form';
import AlertDialog from '../modal/Modal';
import editIcon from '../../assets/icons/edit.svg';
import exitIcon from '../../assets/icons/x.svg';
import COLORS from '../../styles/colors';

const AdditionalField = ({
  exercise, attribute, field,
  updateExercise, deleteExerciseAttribute,
  children,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const submitDescription = async (values) => {
    const updatedExercise = exercise;
    updatedExercise[attribute] = values[attribute];
    await updateExercise(updatedExercise, exercise.id);
    setIsAdding(false);
    setIsEditing(false);
  };

  const renderDescription = () => {
    if (exercise[attribute] != null && exercise[attribute] !== '' && !isEditing) {
      return (
        <>
          <Box sx={{ float: 'right' }}>
            <AlertDialog
              deleteObject={deleteExerciseAttribute}
              id={exercise.id}
              objectType={attribute}
            />
            <IconButton
              sx={{ float: 'right', '&:hover': { backgroundColor: COLORS.BACKGROUND } }}
              title="Edit"
              onClick={() => setIsEditing(true)}
            >
              <Icon>
                <img src={editIcon} height={23} width={23} alt="" />
              </Icon>
            </IconButton>
          </Box>
          {attribute === 'description'
            ? (
              <>
                <Typography
                  sx={{
                    textAlign: 'left',
                    mt: '2rem',
                    ml: '2rem',
                  }}
                  variant="h5"
                >
                  Description:

                </Typography>
                <Typography sx={{
                  width: '730px', textAlign: 'left', m: '2rem', mt: '0.5rem',
                }}
                >
                  {children}
                </Typography>
              </>
            )
            : <Typography sx={{ m: '1rem' }}>{children}</Typography>}
        </>
      );
    }
    if ((exercise[attribute] == null || exercise[attribute] === '') && !isAdding) {
      return (
        <Button
          variant="contained"
          onClick={() => setIsAdding(true)}
        >
          {attribute === 'videoUrl' ? 'Add video' : `Add ${attribute}`}
        </Button>
      );
    }
    if (isEditing) {
      return (
        <Form
          fields={[field]}
          initialValues={{ [attribute]: exercise[attribute] }}
          placeholder={field.placeholder}
          onSubmitFunction={submitDescription}
        />
      );
    }
    return (
      <Form
        fields={[field]}
        initialValues={{ [attribute]: '' }}
        onSubmitFunction={submitDescription}
      />
    );
  };

  return (

    <Card sx={{ m: '2rem', backgroundColor: COLORS.SUB_ITEM }}>
      {isAdding && (
        <IconButton
          sx={{ float: 'right', '&:hover': { backgroundColor: COLORS.BACKGROUND } }}
          title="Cancel submission"
          onClick={() => setIsAdding(false)}
        >
          <Icon>
            <img src={exitIcon} height={23} width={23} alt="" />
          </Icon>
        </IconButton>
      )}
      <Box sx={{ mr: '2rem' }}>
        {renderDescription()}
      </Box>
    </Card>
  );
};

AdditionalField.propTypes = {
  exercise: PropTypes.instanceOf(Object).isRequired,
  attribute: PropTypes.string.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  updateExercise: PropTypes.func.isRequired,
  deleteExerciseAttribute: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AdditionalField;
