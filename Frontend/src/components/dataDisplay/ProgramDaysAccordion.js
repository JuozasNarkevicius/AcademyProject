import React, { useContext, useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Button, Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSnackbar } from 'notistack';
import EditableWorkoutDay from '../editable/EditableWorkoutDay';
import { ProgramContext } from '../../Context';
import editIcon from '../../assets/icons/edit.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import EditableName from '../editable/EditableName';
import programService from '../../services/ProgramService';
import { workoutService } from '../../services/WorkoutService';
import COLORS from '../../styles/colors';
import userService from '../../services/UserService';

const ProgramDaysAccordion = ({ deleteProgram, getPrograms }) => {
  const { program, setProgram } = useContext(ProgramContext);
  const [isDraggable, setIsDraggable] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

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
    getPrograms();
  };

  const updateWorkoutName = async (newName, workoutId) => {
    const newProgram = program;
    const { position } = newProgram.workouts.find((w) => w.id === workoutId);
    newProgram.workouts.find((w) => w.id === workoutId).name = newName;
    setProgram({ ...newProgram });
    await workoutService.updateWorkoutAPI(program.id, workoutId, newName, position);
  };

  const updateProgramStatus = async (status) => {
    await programService.updateProgramAPI(program.id, program.name, status);
    setProgram({ ...program, isPublic: status });
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

  const getProgramPdf = async () => {
    await programService.getProgramPdfAPI(program.id, program.name);
  };

  const handleClickVariant = (message, variant) => {
    const snackBarStyle = { marginLeft: '12rem' };
    enqueueSnackbar(message, { variant, style: snackBarStyle });
  };

  const sendProgramPdfToEmail = async () => {
    const response = await userService.getCurrentUserAPI();
    await programService.sendProgramPdfToEmailAPI(response.data.email, program.id);
    handleClickVariant('Program successfully sent to your email!', 'success');
  };

  return (
    <Box sx={{ ml: '12rem', mt: '3rem', mr: -10 }}>
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
      <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={() => setIsDraggable(true)}>
        <Droppable droppableId="workouts" type="outerItem">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {program.workouts.sort((a, b) => (a.position > b.position ? 1 : -1))
                .map((w, index) => (
                  <Draggable
                    key={w.id}
                    draggableId={String(w.id)}
                    index={index}
                    isDragDisabled={!isDraggable}
                  >
                    {(provided) => (
                      <Accordion
                        sx={{ backgroundColor: COLORS.ITEM, width: '70rem' }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                          onMouseEnter={() => !isDraggable && setIsDraggable(true)}
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
                          <EditableWorkoutDay
                            workout={w}
                            isDraggable={isDraggable}
                            setIsDraggable={setIsDraggable}
                          />
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
      <Button
        sx={{ m: '15px', float: 'left' }}
        variant="contained"
        color="secondary"
        onClick={createWorkout}
      >
        New workout
      </Button>
      {program.isPublic && program.workouts.length > 0
        && (
          <Button
            onClick={() => updateProgramStatus(false)}
            sx={{ float: 'left' }}
            variant="contained"
            color="secondary"
          >
            Stop sharing program
          </Button>
        )}
      {!program.isPublic && program.workouts.length > 0
        && (
          <Button
            onClick={() => updateProgramStatus(true)}
            sx={{ float: 'left' }}
            variant="contained"
            color="secondary"
          >
            Share program
          </Button>
        )}
      {program.workouts.length > 0 && (
        <>
          <Button
            onClick={getProgramPdf}
            sx={{ float: 'left' }}
            variant="contained"
            color="secondary"
          >
            Download PDF
          </Button>
          <Button
            onClick={sendProgramPdfToEmail}
            sx={{ float: 'left' }}
            variant="contained"
            color="secondary"
          >
            Send PDF to email
          </Button>
        </>
      )}
    </Box>
  );
};

ProgramDaysAccordion.propTypes = {
  deleteProgram: PropTypes.func.isRequired,
  getPrograms: PropTypes.func.isRequired,
};

export default ProgramDaysAccordion;
