import { Button as MuiButton } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import COLORS from '../styles/colors';

const Button = ({
  text, onClick, width, type,
}) => (
  <MuiButton
    sx={{
      color: COLORS.TEXT,
      margin: '10px',
      backgroundColor: COLORS.SECONDARY,
      '&:hover': { backgroundColor: COLORS.SECONDARY_HOVER },
      width,
    }}
    onClick={onClick}
    type={type}
  >
    {text}
  </MuiButton>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  width: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  width: '8rem',
  onClick: null,
  type: null,
};

export default Button;
