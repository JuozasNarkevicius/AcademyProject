import React, { useContext } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkoutDay from './WorkoutDay';
import ProgramContext from '../../Context';
import editIcon from '../../assets/icons/edit.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import EditableName from './EditableName';
import { programService } from '../../services/ProgramService';
import { workoutService } from '../../services/WorkoutService';

const ProgramDaysAccordion = () => {
  const { program, setProgram } = useContext(ProgramContext);

  const updateProgramName = async (newName) => {
    await programService.updateProgramNameAPI(program.id, newName);
    setProgram({ ...program, name: newName });
  };

  const updateWorkoutName = async (newName, workoutId) => {
    const newProgram = program;
    newProgram.workouts.find((w) => w.id === workoutId).name = newName;
    setProgram({ ...newProgram });
    await workoutService.updateWorkoutNameAPI(program.id, workoutId, newName);
  };

  return (
    <Container sx={{ mt: '100px' }}>
      <EditableName
        imgSrcEdit={editIcon}
        imgSrcSave={saveIcon}
        nameField={program.name}
        saveNewName={updateProgramName}
      />
      {program.workouts.map((w) => (
        <Accordion key={w.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <EditableName
              imgSrcEdit={editIcon}
              imgSrcSave={saveIcon}
              nameField={w.name}
              objectId={w.id}
              saveNewName={updateWorkoutName}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <WorkoutDay workout={w} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default ProgramDaysAccordion;
