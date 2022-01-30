/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Container, Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkoutDay from './WorkoutDay';
import { ProgramContext } from '../../Context';
import editIcon from '../../assets/icons/edit.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import deleteIcon from '../../assets/icons/x.svg';
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
    <Container sx={{ mt: '100px' }}>
      <EditableName
        imgSrcEdit={editIcon}
        imgSrcSave={saveIcon}
        imgSrcDelete={deleteIcon}
        nameField={program.name}
        objectId={program.id}
        saveNewName={updateProgramName}
        deleteObject={deleteProgram}
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
              imgSrcDelete={deleteIcon}
              nameField={w.name}
              objectId={w.id}
              saveNewName={updateWorkoutName}
              deleteObject={deleteWorkout}
            />
          </AccordionSummary>
          <AccordionDetails>
            <WorkoutDay workout={w} />
          </AccordionDetails>
        </Accordion>
      ))}
      <Button sx={{ m: '15px' }} variant="contained" onClick={createWorkout}>New workout</Button>
    </Container>
  );
};

export default ProgramDaysAccordion;
