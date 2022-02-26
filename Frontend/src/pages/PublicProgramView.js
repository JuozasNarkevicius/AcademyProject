import React, { useState, useEffect } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Container, Typography, CircularProgress, Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { programService } from '../services/ProgramService';
import WorkoutDay from '../components/dataDisplay/WorkoutDay';

const PublicProgramView = () => {
  const [program, setProgram] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getProgram = async () => {
    const response = await programService.getProgramAPI(id);
    setProgram(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProgram();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: '4rem' }}>
      <Typography>{program.name}</Typography>
      {program.workouts.map((w) => (
        <Accordion key={w.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{w.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <WorkoutDay workout={w} />
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        variant="contained"
      >
        Add program to Library
      </Button>
    </Container>
  );
};

export default PublicProgramView;
