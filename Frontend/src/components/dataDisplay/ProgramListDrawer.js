import React from 'react';
import {
  Box, Drawer, CssBaseline, Toolbar, List, ListItem, ListItemText, Button,
} from '@mui/material';
import PropTypes from 'prop-types';

const drawerWidth = 200;

const ProgramListDrawer = ({ programs, handleClick, createProgram }) => (
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
            <ListItem button key={program.id} onClick={() => (handleClick(program.id))}>
              <ListItemText primary={program.name} />
            </ListItem>
          ))}
        </List>
        <Button sx={{ m: '15px', float: 'left' }} variant="contained" onClick={createProgram}>New program</Button>
      </Box>
    </Drawer>
  </Box>
);

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
