import React, { useEffect, useState } from 'react';
import { TextField, CircularProgress, Autocomplete } from '@mui/material';
import { exerciseService } from '../../services/ExerciseService';

const ExerciseAutocomplete = () => {
  const [exercises, setExercises] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getExercises = async () => {
    const response = await exerciseService.getExerciseNamesAPI();
    setExercises(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getExercises();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={exercises.map((option) => option.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search input"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
};

export default ExerciseAutocomplete;