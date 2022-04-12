/* eslint-disable no-unused-vars */
import {
  Typography, Card, IconButton, Icon,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import exitIcon from '../../assets/icons/x.svg';
import videoService from '../../services/genericServices/video';

const opts = {
  height: '390',
  width: '640',
};

const ExerciseDetails = ({ exercise, setIsBackdropOpen }) => {
  const [videoEvent, setVideoEvent] = useState();

  return (
    <Card sx={{ minHeight: '30rem', minWidth: '60rem', maxWidth: '60rem' }}>
      <IconButton
        sx={{ float: 'right', m: 1 }}
        title="Exit"
        onClick={() => {
          setIsBackdropOpen(false);
          videoEvent.target.pauseVideo();
        }}
      >
        <Icon>
          <img src={exitIcon} height={23} width={23} alt="" />
        </Icon>
      </IconButton>
      <Typography variant="h5" sx={{ mt: '1rem' }}>{exercise.name}</Typography>
      <Card sx={{ m: '2rem', p: '2rem' }}>
        {exercise.description
          ? <Typography>{exercise.description}</Typography>
          : <Typography>No description added</Typography>}
      </Card>
      <Card sx={{ m: '2rem', p: '1rem' }}>
        {exercise.videoUrl ? (
          <YouTube
            videoUrl={exercise.videoUrl
        && videoService.getIdFromUrl(exercise.videoUrl)}
            opts={opts}
            onPlay={setVideoEvent}
          />
        ) : <Typography>No video uploaded</Typography>}
      </Card>
    </Card>
  );
};

ExerciseDetails.propTypes = {
  exercise: PropTypes.instanceOf(Object).isRequired,
  setIsBackdropOpen: PropTypes.func.isRequired,
};

export default ExerciseDetails;
