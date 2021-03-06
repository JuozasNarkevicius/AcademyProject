import React from 'react';
import {
  Dialog, DialogActions, DialogTitle, IconButton, Icon,
} from '@mui/material';
import PropTypes from 'prop-types';
import deleteIcon from '../../assets/icons/x.svg';
import COLORS from '../../styles/colors';
import styles from './Modal.module.css';
import Button from '../Button';

const AlertDialog = ({
  deleteObject, objectType,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleConfirm = (e) => {
    handleClose(e);
    deleteObject();
  };
  return (
    <>
      <IconButton
        title="Delete"
        onClick={handleClickOpen}
        sx={{ '&:hover': { backgroundColor: COLORS.BACKGROUND } }}
      >
        <Icon>
          <img src={deleteIcon} height={23} width={23} alt="k" />
        </Icon>
      </IconButton>
      <Dialog
        className={styles.Modal}
        sx={{ color: COLORS.BACKGROUND, paper: { backgroundColor: 0 } }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this
          {' '}
          {objectType}
          ?
        </DialogTitle>
        <DialogActions>
          <Button text="No" onClick={handleClose} width="3rem" />
          <Button text="Yes" onClick={handleConfirm} width="3rem" />
        </DialogActions>
      </Dialog>
    </>
  );
};

AlertDialog.propTypes = {
  deleteObject: PropTypes.func.isRequired,
  objectType: PropTypes.string.isRequired,
};

export default AlertDialog;
