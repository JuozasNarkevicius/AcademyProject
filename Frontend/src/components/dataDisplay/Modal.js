import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle, IconButton, Icon,
} from '@mui/material';
import PropTypes from 'prop-types';

const AlertDialog = ({
  deleteObject, id, objectType, imgSrcDelete,
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

  return (
    <>
      <IconButton
        title="Delete"
        onClick={handleClickOpen}
      >
        <Icon>
          <img src={imgSrcDelete} height={23} width={23} alt="k" />
        </Icon>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this
          {' '}
          {objectType}
          ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => deleteObject(id)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AlertDialog.propTypes = {
  deleteObject: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  objectType: PropTypes.string.isRequired,
  imgSrcDelete: PropTypes.string.isRequired,
};

export default AlertDialog;
