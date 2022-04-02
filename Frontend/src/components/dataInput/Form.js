import {
  Button, TextField,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

const Form = ({
  fields, initialValues, validationSchema, onSubmitFunction,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await onSubmitFunction(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map((field) => (
        <TextField
          sx={{ m: '10px' }}
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
          helperText={formik.touched[field.name] && formik.errors[field.name]}
        />
      ))}
      <Button sx={{ m: '1rem' }} variant="contained" size="large" type="submit">Submit</Button>
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(Object).isRequired,
  initialValues: PropTypes.instanceOf(Object).isRequired,
  validationSchema: PropTypes.instanceOf(Object),
  onSubmitFunction: PropTypes.func.isRequired,
};

Form.defaultProps = {
  validationSchema: null,
};

export default Form;
