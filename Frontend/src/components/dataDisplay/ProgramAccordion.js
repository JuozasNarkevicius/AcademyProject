import React from 'react';
import {
  Typography, Accordion as AccordionMUI, AccordionSummary, AccordionDetails, Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import WorkoutDay from './WorkoutDay';

const ProgramAccordion = ({ program }) => (
  <Box sx={{ mt: '8rem' }}>
    <Typography sx={{ mb: '2rem' }}>{program.name}</Typography>
    {program.workouts.map((w) => (
      <AccordionMUI key={w.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{w.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <WorkoutDay workout={w} />
        </AccordionDetails>
      </AccordionMUI>
    ))}
  </Box>
);

export default ProgramAccordion;

ProgramAccordion.propTypes = {
  program: PropTypes.instanceOf(Object).isRequired,
};
