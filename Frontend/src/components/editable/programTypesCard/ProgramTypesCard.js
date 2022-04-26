import {
  Card, Chip, IconButton, Icon, Box, FormControlLabel, Switch,
} from '@mui/material';
import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import exitIcon from '../../../assets/icons/x.svg';
import COLORS from '../../../styles/colors';

const ProgramTypesCard = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card sx={{
      height: '4rem',
      width: 'auto',
      mb: '1rem',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: COLORS.ITEM,
    }}
    >
      {/* <Chip
      label="Strength"
      color="success"
      variant="outlined"
    /> */}
      <Box>
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          direction="right"
          icon={(
            <Chip
              label="Strength"
              color="success"
              variant="outlined"
            />
          )}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          <SpeedDialAction
            sx={{ height: 1 }}
            icon={(
              <IconButton sx={{ backgroundColor: COLORS.ITEM }}>
                <Icon>
                  <img src={exitIcon} height={10} width={10} alt="k" />
                </Icon>
              </IconButton>
            )}
          />
        </SpeedDial>
      </Box>
      {/* <Chip label="Aerobic" color="warning" variant="outlined" sx={{ ml: '1rem' }} /> */}
    </Card>
  );
};

export default ProgramTypesCard;
