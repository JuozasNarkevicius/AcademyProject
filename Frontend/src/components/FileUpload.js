import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const FileUpload = ({
  name, setFieldValue,
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
      {acceptedFiles[0]
        ? <Typography>{acceptedFiles[0].name}</Typography>
        : <Typography>Drag n drop or click to upload an image</Typography>}
    </Box>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default FileUpload;
