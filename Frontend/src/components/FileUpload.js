import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import COLORS from '../styles/colors';

const FileUpload = ({
  name, setFieldValue, imageName, setImageName,
}) => {
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFieldValue('imageId', acceptedFiles);
      setImageName(acceptedFiles[0].name);
    },
  });

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
    }}
    >
      <Box
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          borderColor: COLORS.TEXT,
          borderStyle: 'dashed',
          backgroundColor: COLORS.BACKGROUND,
          padding: '0.3rem',
          height: '4rem',
          width: '320px',
          m: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'Center',
        }}
      >
        <TextField
          sx={{ maxWidth: '2rem' }}
          {...getInputProps()}
          name={name}
        />
        {imageName
          ? <Typography>{imageName}</Typography>
          : <Typography>Drag n drop or click to upload an image</Typography>}
      </Box>
    </Box>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  imageName: PropTypes.string,
  setImageName: PropTypes.func.isRequired,
};

FileUpload.defaultProps = {
  imageName: null,
};

export default FileUpload;
