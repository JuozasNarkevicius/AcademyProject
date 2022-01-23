import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const ProgramListDrawer = ({ programs, handleClick }) => (
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
};

export default ProgramListDrawer;
