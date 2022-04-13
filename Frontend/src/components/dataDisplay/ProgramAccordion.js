import React from 'react';
import {
  Typography, Accordion as AccordionMUI, AccordionSummary, AccordionDetails, Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import WorkoutDay from './WorkoutDay';
import COLORS from '../../styles/colors';

const ProgramAccordion = ({ program }) => (
  <Box sx={{ mt: '8rem' }}>
    <Typography sx={{ mb: '2rem', color: COLORS.TEXT }}>{program.name}</Typography>
    {program.workouts.map((w) => (
      <AccordionMUI key={w.id} sx={{ width: '60vw', backgroundColor: COLORS.ITEM }}>
        <AccordionSummary
          sx={{ height: '4rem' }}
          expandIcon={<ExpandMoreIcon sx={{ color: COLORS.TEXT }} />}
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
