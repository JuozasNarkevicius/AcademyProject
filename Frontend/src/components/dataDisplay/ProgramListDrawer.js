import React, { useState } from 'react';
import {
  Box, Drawer, CssBaseline, Toolbar, List, ListItem, ListItemText, Button, Divider,
} from '@mui/material';
import PropTypes from 'prop-types';
import COLORS from '../../styles/colors';

const drawerWidth = '12rem';

const ProgramListDrawer = ({
  programs, savedPrograms, handleClick, createProgram,
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState();

  const selectProgram = (programId, programType) => {
    handleClick(programId, programType);
    setSelectedProgramId(programId);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: COLORS.ITEM },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {programs.map((program) => (
              (program.id === selectedProgramId) ? (
                <ListItem selected key={program.id} onClick={() => selectProgram(program.id, 'owned')}>
                  <ListItemText sx={{ textAlign: 'center' }} primary={program.name} />
                </ListItem>
              ) : (
                <ListItem sx={{ '&:hover': { backgroundColor: COLORS.SUB_ITEM } }} key={program.id} onClick={() => selectProgram(program.id, 'owned')}>
                  <ListItemText sx={{ textAlign: 'center' }} primary={program.name} />
                </ListItem>
              )
            ))}
          </List>
          <Button sx={{ m: '10px', float: 'middle' }} variant="contained" onClick={createProgram} color="secondary">New program</Button>
          <Divider sx={{ backgroundColor: COLORS.SUB_ITEM_ITEM }} />
          <List>
            {savedPrograms.map((program) => (
              (program.id === selectedProgramId) ? (
                <ListItem selected key={program.id} onClick={() => selectProgram(program.id, 'saved')}>
                  <ListItemText sx={{ textAlign: 'center' }} primary={program.name} />
                </ListItem>
              ) : (
                <ListItem sx={{ '&:hover': { backgroundColor: COLORS.SUB_ITEM } }} key={program.id} onClick={() => selectProgram(program.id, 'saved')}>
                  <ListItemText sx={{ textAlign: 'center' }} primary={program.name} />
                </ListItem>
              )
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

ProgramListDrawer.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  savedPrograms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  createProgram: PropTypes.func.isRequired,
};

export default ProgramListDrawer;
