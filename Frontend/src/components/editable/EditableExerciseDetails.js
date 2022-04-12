import {
  Typography, Card, IconButton, Icon,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import exitIcon from '../../assets/icons/x.svg';
import AdditionalField from './AdditionalField';
import videoService from '../../services/genericServices/video';

const opts = {
  height: '390',
  width: '640',
};

const additionalContentFields = [
  { name: 'description', label: 'Description', type: 'text' },
  { name: 'videoUrl', label: 'Video', type: 'text' },
];

const EditableExerciseDetails = ({
  exercise, setIsBackdropOpen, setIsDraggable, deleteExerciseAttribute, updateExercise,
}) => {
  const [videoEvent, setVideoEvent] = useState();

  console.log(videoService.getIdFromUrl(exercise.videoUrl));
  return (
    <Card sx={{ minHeight: '30rem', minWidth: '60rem', maxWidth: '60rem' }}>
      <IconButton
        sx={{ float: 'right', m: 1 }}
        title="Exit"
        onClick={() => {
          setIsBackdropOpen(false);
          setIsDraggable(true);
          videoEvent.target.pauseVideo();
        }}
      >
        <Icon>
          <img src={exitIcon} height={23} width={23} alt="" />
        </Icon>
      </IconButton>
      <Typography variant="h5" sx={{ mt: '2rem' }}>{exercise.name}</Typography>
      <AdditionalField
        exercise={exercise}
        attribute="description"
        field={additionalContentFields[0]}
        updateExercise={updateExercise}
        deleteExerciseAttribute={() => deleteExerciseAttribute(exercise, 'description')}
      >
        <Typography>{exercise.description}</Typography>
      </AdditionalField>
      <AdditionalField
        exercise={exercise}
        attribute="videoUrl"
        field={additionalContentFields[1]}
        updateExercise={updateExercise}
        deleteExerciseAttribute={() => deleteExerciseAttribute(exercise, 'videoUrl')}
      >
        <YouTube
          videoId={exercise.videoUrl
        && videoService.getIdFromUrl(exercise.videoUrl)}
          opts={opts}
          onPlay={setVideoEvent}
        />
      </AdditionalField>
    </Card>
  );
};

EditableExerciseDetails.propTypes = {
  exercise: PropTypes.instanceOf(Object).isRequired,
  setIsBackdropOpen: PropTypes.func.isRequired,
  setIsDraggable: PropTypes.func.isRequired,
  deleteExerciseAttribute: PropTypes.func.isRequired,
  updateExercise: PropTypes.func.isRequired,
};

export default EditableExerciseDetails;
