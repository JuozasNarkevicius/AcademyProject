import React, { useContext } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/x.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import { ProgramContext } from '../../Context';
import EditableExercise from './EditableExercise';
import { exerciseService } from '../../services/ExerciseService';

const EditableWorkoutDay = ({ workout }) => {
  const { program, setProgram } = useContext(ProgramContext);

  const handleOnDragEnd = async (result) => {
    const positions = [];
    positions.push(result.source.index);
    positions.push(result.destination.index);

    const newExercises = program.workouts.find((w) => w.id === workout.id).exercises;
    const [reorderedItem] = newExercises.splice(result.source.index, 1);
    newExercises.splice(result.destination.index, 0, reorderedItem);
    for (let i = 0; i < newExercises.length; i++) {
      newExercises[i].position = i;
    }
    const newProgram = program;
    newProgram.workouts.find((w) => w.id === workout.id).exercises = newExercises;
    setProgram({ ...newProgram });
    await exerciseService.updateExercisePositionsAPI(workout.id, positions);
  };

  const createExercise = async () => {
    const newProgram = program;
    const exerciseCount = newProgram.workouts.find((w) => w.id === workout.id).exercises.length;
    const exercise = {
      name: 'New exercise', sets: '4', reps: '12, 12, 12, 12', rest: '60', position: exerciseCount,
    };
    const response = await exerciseService.postExerciseAPI(workout.id, exercise);
    exercise.id = response.data.id;
    newProgram.workouts.find((w) => w.id === workout.id).exercises.push(exercise);
    setProgram({ ...newProgram });
  };

  const updateExercise = async (editedExercise, exerciseId) => {
    const newProgram = program;
    const workoutIndex = newProgram.workouts
      .findIndex((w) => w.id === workout.id);
    const exerciseIndex = newProgram.workouts[workoutIndex]
      .exercises.findIndex((e) => e.id === exerciseId);
    newProgram.workouts[workoutIndex]
      .exercises[exerciseIndex] = editedExercise;
    setProgram({ ...newProgram });
    const { id, ...exerciseWithoutId } = editedExercise;
    await exerciseService.updateExerciseAPI(workout.id, exerciseId, exerciseWithoutId);
  };

  const deleteExercise = async (exerciseId) => {
    const newProgram = program;
    const newExercisesArray = newProgram.workouts.find((w) => w.id === workout.id).exercises;
    newExercisesArray.splice(newExercisesArray.findIndex((e) => e.id === exerciseId), 1);
    newProgram.workouts.find((w) => w.id === workout.id).exercises = newExercisesArray;
    setProgram({ ...newProgram });
    await exerciseService.deleteExerciseAPI(workout.id, exerciseId);
  };

  return (
    <>
      <TableContainer component={Paper}>
        {workout.exercises.length ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Exercise name</TableCell>
                <TableCell>Sets</TableCell>
                <TableCell>Reps</TableCell>
                <TableCell>Rest (seconds)</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="exercises" type="innerItem">
                {(provided) => (
                  <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                    {workout.exercises.sort((a, b) => (a.position > b.position ? 1 : -1))
                      .map((e, index) => (
                        <Draggable key={e.id} draggableId={String(e.id)} index={index}>
                          {(provided) => (
                            <TableRow
                              sx={{ flexGrow: 1, flexBasis: 1 }}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <EditableExercise
                                exercise={e}
                                imgSrcEdit={editIcon}
                                imgSrcSave={saveIcon}
                                imgSrcDelete={deleteIcon}
                                objectType="exercise"
                                updateExercise={updateExercise}
                                deleteExercise={deleteExercise}
                              />
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
          </Table>
        ) : <Typography>This workout has no exercises.</Typography>}
      </TableContainer>
      <Button sx={{ m: '15px', float: 'left' }} variant="contained" color="secondary" onClick={createExercise}>New exercise</Button>
    </>
  );
};

EditableWorkoutDay.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sets: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
        reps: PropTypes.string,
        rest: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
      }),
    ).isRequired,
  }).isRequired,
};

export default EditableWorkoutDay;
