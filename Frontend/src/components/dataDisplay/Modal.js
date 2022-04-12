/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, IconButton, Icon,
} from '@mui/material';
import PropTypes from 'prop-types';
import deleteIcon from '../../assets/icons/x.svg';
import COLORS from '../../styles/colors';

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
        sx={{ float: 'right' }}
        title="Delete"
        onClick={handleClickOpen}
      >
        <Icon>
          <img src={deleteIcon} height={23} width={23} alt="k" />
        </Icon>
      </IconButton>
      <Dialog
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
          <Button color="secondary" onClick={handleClose}>No</Button>
          <Button color="secondary" onClick={handleConfirm} autoFocus>
            Yes
          </Button>
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
