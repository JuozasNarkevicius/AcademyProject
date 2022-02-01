import React, { useContext } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Container, Button, Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import WorkoutDay from './WorkoutDay';
import { ProgramContext } from '../../Context';
import editIcon from '../../assets/icons/edit.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import EditableName from './EditableName';
import { programService } from '../../services/ProgramService';
import { workoutService } from '../../services/WorkoutService';

const ProgramDaysAccordion = ({ deleteProgram }) => {
  const { program, setProgram } = useContext(ProgramContext);

  const createWorkout = async () => {
    const workout = {
      name: 'New Workout', exercises: [],
    };
    const response = await workoutService.postWorkoutAPI(program.id, workout);
    workout.id = response.data.id;
    const newProgram = program;
    newProgram.workouts.push(workout);
    setProgram({ ...newProgram });
  };

  const deleteWorkout = async (workoutId) => {
    const newProgram = program;
    newProgram.workouts.splice(program.workouts.findIndex((w) => w.id === workoutId), 1);
    setProgram({ ...newProgram });
    await workoutService.deleteWorkoutAPI(program.id, workoutId);
  };

  const updateProgramName = async (newName) => {
    await programService.updateProgramAPI(program.id, newName);
    setProgram({ ...program, name: newName });
  };

  const updateWorkoutName = async (newName, workoutId) => {
    const newProgram = program;
    newProgram.workouts.find((w) => w.id === workoutId).name = newName;
    setProgram({ ...newProgram });
    await workoutService.updateWorkoutAPI(program.id, workoutId, newName);
  };

  return (
    <Container sx={{ ml: 5, mt: '8rem' }}>
      <Box sx={{ mb: '30px' }}>
        <EditableName
          imgSrcEdit={editIcon}
          imgSrcSave={saveIcon}
          nameField={program.name}
          objectId={program.id}
          objectType="program"
          saveNewName={updateProgramName}
          deleteObject={deleteProgram}
        />
      </Box>
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
              objectType="workout"
              saveNewName={updateWorkoutName}
              deleteObject={deleteWorkout}
            />
          </AccordionSummary>
          <AccordionDetails>
            <WorkoutDay workout={w} />
          </AccordionDetails>
        </Accordion>
      ))}
      <Button sx={{ m: '15px' }} variant="contained" color="secondary" onClick={createWorkout}>New workout</Button>
    </Container>
  );
};

ProgramDaysAccordion.propTypes = {
  deleteProgram: PropTypes.func.isRequired,
};

export default ProgramDaysAccordion;
