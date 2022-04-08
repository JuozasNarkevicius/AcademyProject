/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({
  name, value, setFieldValue, helperText, error,
}) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFieldValue('profileImage', acceptedFiles);
    },
  });

  return (
    <Box
      {...getRootProps({ className: 'dropzone' })}
      sx={{
        borderColor: '#DEDEDE',
        borderStyle: 'dashed',
        backgroundColor: '#F5F5F5',
        m: '1rem',
      }}
    >
      <TextField
        {...getInputProps()}
        name={name}
      />
      <Typography>Drag n drop or click to upload an image</Typography>
      <Typography>{error}</Typography>
    </Box>
  );
};

export default FileUpload;
