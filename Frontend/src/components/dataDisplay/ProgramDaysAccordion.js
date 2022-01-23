import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import axios from 'axios';
import WorkoutDay from './WorkoutDay';
import baseAdress from '../../API/BaseAddress';
import ProgramContext from '../../Context';
import editIcon from '../../assets/icons/edit.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import EditableName from './EditableName';

const ProgramDaysAccordion = () => {
  const { program, setProgram } = useContext(ProgramContext);

  const updateProgramName = async (newName) => {
    await axios.put(`${baseAdress}/users/1/programs/${program.id}`, { name: newName });
    setProgram({ ...program, name: newName });
  };

  const updateWorkoutName = async (newName, workoutId) => {
    const newProgram = program;
    newProgram.workouts.find((w) => w.id === workoutId).name = newName;
    setProgram({ ...newProgram });
    await axios.put(`${baseAdress}/programs/${program.id}}/workouts/${workoutId}`, { name: newName });
  };

  return (
    <Container sx={{ mt: '100px' }}>
      <EditableName
        imgSrcEdit={editIcon}
        imgSrcSave={saveIcon}
        nameField={program.name}
        update={updateProgramName}
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
              update={updateWorkoutName}
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
