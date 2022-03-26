import React, { useContext } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Button, Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditableWorkoutDay from './EditableWorkoutDay';
import { ProgramContext } from '../../Context';
import editIcon from '../../assets/icons/edit.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import EditableName from './EditableName';
import { programService } from '../../services/ProgramService';
import { workoutService } from '../../services/WorkoutService';

const ProgramDaysAccordion = ({ deleteProgram }) => {
  const { program, setProgram } = useContext(ProgramContext);

  const createWorkout = async () => {
    const newProgram = program;
    const workoutCount = newProgram.workouts.length;
    const workout = {
      name: 'New Workout', position: workoutCount, exercises: [],
    };
    const response = await workoutService.postWorkoutAPI(program.id, workout);
    workout.id = response.data.id;
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
    setProgram({ ...program, name: newName });
    await programService.updateProgramAPI(program.id, newName);
  };

  const updateWorkoutName = async (newName, workoutId) => {
    const newProgram = program;
    newProgram.workouts.find((w) => w.id === workoutId).name = newName;
    setProgram({ ...newProgram });
    await workoutService.updateWorkoutAPI(program.id, workoutId, newName);
  };

  const handleOnDragEnd = async (result) => {
    const positions = [];
    positions.push(result.source.index);
    positions.push(result.destination.index);

    const newWorkouts = program.workouts;
    const [reorderedItem] = newWorkouts.splice(result.source.index, 1);
    newWorkouts.splice(result.destination.index, 0, reorderedItem);
    for (let i = 0; i < newWorkouts.length; i++) {
      newWorkouts[i].position = i;
    }
    const newProgram = program;
    newProgram.workouts = newWorkouts;
    setProgram({ ...newProgram });
    await workoutService.updateWorkoutPositionsAPI(program.id, positions);
  };

  return (
    <Box sx={{ ml: 8, mt: '8rem', mr: -10 }}>
      <Box sx={{ mb: '2rem' }}>
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="workouts" type="outerItem">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {program.workouts.sort((a, b) => (a.position > b.position ? 1 : -1))
                .map((w, index) => (
                  <Draggable key={w.id} draggableId={String(w.id)} index={index}>
                    {(provided) => (
                      <Accordion
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
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
                          <EditableWorkoutDay workout={w} />
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Button sx={{ m: '15px' }} variant="contained" color="secondary" onClick={createWorkout}>New workout</Button>
    </Box>
  );
};

ProgramDaysAccordion.propTypes = {
  deleteProgram: PropTypes.func.isRequired,
};

export default ProgramDaysAccordion;
