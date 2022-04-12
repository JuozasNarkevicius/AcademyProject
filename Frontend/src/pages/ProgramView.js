/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import {
  Container, Typography, Button,
} from '@mui/material';
import ProgramListDrawer from '../components/dataDisplay/ProgramListDrawer';
import ProgramDaysAccordion from '../components/dataDisplay/ProgramDaysAccordion';
import programService from '../services/ProgramService';
import { ProgramContext } from '../Context';
import ProgramAccordion from '../components/dataDisplay/ProgramAccordion';
import COLORS from '../styles/colors';
import Loading from '../components/Loading';

const ProgramView = () => {
  const [programList, setProgramList] = useState([]);
  const [savedProgramList, setSavedProgramList] = useState([]);
  const [program, setProgram] = useState(null);
  const [selectedProgramType, setSelectedProgramType] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const programMemo = useMemo(() => ({ program, setProgram }), [program]);

  const createProgram = async () => {
    const newProgram = {
      name: 'New Program',
    };
    const response = await programService.postProgramAPI(newProgram.name);
    newProgram.id = response.data.id;
    setProgramList([...programList, newProgram]);
  };

  const deleteProgram = async (programId) => {
    await programService.deleteProgramAPI(programId);
    const newProgramList = programList;
    const programIndex = newProgramList.findIndex((p) => p.id === programId);
    newProgramList.splice(programIndex, 1);
    setProgramList([...newProgramList]);
    setProgram(null);
  };

  const handleDrawerButtonClick = async (id, programType) => {
    const response = await programService.getProgramAPI(id);
    setProgram(response.data);
    setSelectedProgramType(programType);
  };

  const unfollowProgram = async () => {
    await programService.deleteSavedProgramAPI(program.id);
  };

  useEffect(async () => {
    const allPrograms = await programService.getAllProgramsAPI();
    const allSavedPrograms = await programService.getAllSavedProgramsAPI();
    setProgramList(allPrograms.data);
    setSavedProgramList(allSavedPrograms.data);
    setIsLoading(false);
  }, [program]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <ProgramContext.Provider value={programMemo}>
        <ProgramListDrawer
          programs={programList}
          savedPrograms={savedProgramList}
          createProgram={createProgram}
          handleClick={handleDrawerButtonClick}
        />
        {program && selectedProgramType === 'owned'
        && <ProgramDaysAccordion deleteProgram={deleteProgram} programType={selectedProgramType} />}
        {program && selectedProgramType === 'saved'
        && (
          <>
            <ProgramAccordion program={program} />
            <Button
              variant="contained"
              sx={{
                float: 'left', ml: '4rem', backgroundColor: COLORS.SECONDARY, '&:hover': { backgroundColor: COLORS.SECONDARY_HOVER },
              }}
              onClick={unfollowProgram}
            >
              Unfollow program
            </Button>
          </>
        )}
        {!program
        && (
          <Typography variant="h4" sx={{ mt: '8rem' }}>
            Choose a program!
          </Typography>
        )}
      </ProgramContext.Provider>
    </Container>
  );
};

export default ProgramView;
