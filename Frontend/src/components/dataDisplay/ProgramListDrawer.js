import React, { useState } from 'react';
import {
  Box, Drawer, CssBaseline, Toolbar, List, ListItem, ListItemText, Button,
} from '@mui/material';
import PropTypes from 'prop-types';

const drawerWidth = '12rem';

const ProgramListDrawer = ({ programs, handleClick, createProgram }) => {
  const [selectedProgramId, setSelectedProgramId] = useState();

  const selectProgram = (programId) => {
    handleClick(programId);
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
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {programs.map((program) => (
              (program.id === selectedProgramId) ? (
                <ListItem selected key={program.id} onClick={() => selectProgram(program.id)}>
                  <ListItemText sx={{ textAlign: 'center' }} primary={program.name} />
                </ListItem>
              ) : (
                <ListItem sx={{ '&:hover': { backgroundColor: '#dbdbdb' } }} key={program.id} onClick={() => selectProgram(program.id)}>
                  <ListItemText sx={{ textAlign: 'center' }} primary={program.name} />
                </ListItem>
              )
            ))}
          </List>
          <Button sx={{ m: '10px', float: 'middle' }} variant="contained" onClick={createProgram} color="secondary">New program</Button>
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
  handleClick: PropTypes.func.isRequired,
  createProgram: PropTypes.func.isRequired,
};

export default ProgramListDrawer;
