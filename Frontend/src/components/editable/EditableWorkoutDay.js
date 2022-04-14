/* eslint-disable max-lines */
import React, { useContext, useState } from 'react';
import {
  Table, TableBody, TableCell, Backdrop, TableContainer,
  TableHead, TableRow, Button, Typography, CssBaseline,
} from '@mui/material';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import editIcon from '../../assets/icons/edit.svg';
import saveIcon from '../../assets/icons/checkmark.svg';
import { ProgramContext } from '../../Context';
import EditableExercise from './EditableExercise';
import { exerciseService } from '../../services/ExerciseService';
import ExerciseForm from '../dataInput/ExerciseForm';
import EditableExerciseDetails from './EditableExerciseDetails';
import COLORS from '../../styles/colors';

const EditableWorkoutDay = ({ workout, setIsDraggable }) => {
  const { program, setProgram } = useContext(ProgramContext);
  const [IsBackdropOpen, setIsBackdropOpen] = useState(false);
  const [IsExerciseDetails, setIsExerciseDetails] = useState();
  const [viewedExercise, setViewedExercise] = useState();

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

  const handleBackdropOpen = (isOpen, isExerciseDetails, exercise) => {
    setIsBackdropOpen(isOpen);
    setIsExerciseDetails(isExerciseDetails);
    if (exercise) {
      setViewedExercise(exercise);
    }
  };

  const createExercise = async (exercise) => {
    const newProgram = program;
    exercise.position = newProgram.workouts.find((w) => w.id === workout.id).exercises.length;
    const response = await exerciseService.postExerciseAPI(workout.id, exercise);
    exercise.id = response.data.id;
    newProgram.workouts.find((w) => w.id === workout.id).exercises.push(exercise);
    setProgram({ ...newProgram });
    handleBackdropOpen(false, false);
    setIsDraggable(true);
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

  const deleteExerciseAttribute = async (exercise, attribute) => {
    const newProgram = program;
    const { id, ...exerciseWithoutId } = exercise;
    exerciseWithoutId[attribute] = null;
    newProgram.workouts.find((w) => w.id === workout.id)
      .exercises.find((e) => e.id === id)[attribute] = null;
    setProgram({ ...newProgram });
    await exerciseService.updateExerciseAPI(workout.id, id, exerciseWithoutId);
  };

  return (
    <>
      <TableContainer>
        <CssBaseline />
        {workout.exercises.length ? (
          <Table sx={{ backgroundColor: COLORS.SUB_ITEM, borderRadius: 3 }}>
            <TableHead>
              <TableRow sx={{ borderColor: 'gray' }}>
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
                        <Draggable
                          key={e.id}
                          draggableId={String(e.id)}
                          index={index}
                        >
                          {(provided) => (
                            <TableRow
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              onMouseEnter={() => setIsDraggable(false)}
                            >
                              <EditableExercise
                                exercise={e}
                                imgSrcEdit={editIcon}
                                imgSrcSave={saveIcon}
                                objectType="exercise"
                                updateExercise={updateExercise}
                                deleteExercise={deleteExercise}
                                handleBackdropOpen={handleBackdropOpen}
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
        ) : (
          <Typography sx={{ borderRadius: '5px', backgroundColor: COLORS.SUB_ITEM }}>
            This workout has no exercises.
          </Typography>
        )}
      </TableContainer>
      <Button
        sx={{ m: '15px', float: 'left' }}
        variant="contained"
        color="secondary"
        onClick={() => {
          handleBackdropOpen(true, false);
          setIsDraggable(false);
        }}
      >
        New exercise
      </Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={IsBackdropOpen}
      >
        {IsExerciseDetails ? (
          <EditableExerciseDetails
            exercise={viewedExercise}
            setIsBackdropOpen={setIsBackdropOpen}
            setIsDraggable={setIsDraggable}
            deleteExerciseAttribute={deleteExerciseAttribute}
            updateExercise={updateExercise}
          />
        ) : (
          <ExerciseForm
            createExercise={createExercise}
            setIsBackdropOpen={setIsBackdropOpen}
            setIsDraggable={setIsDraggable}
          />
        )}
      </Backdrop>
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
  setIsDraggable: PropTypes.func.isRequired,
};

export default EditableWorkoutDay;
