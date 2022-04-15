import React, { useState, useEffect, useMemo } from 'react';
import {
  Container, Typography, Button, Box,
} from '@mui/material';
import ProgramListDrawer from '../components/dataDisplay/ProgramListDrawer';
import ProgramDaysAccordion from '../components/dataDisplay/ProgramDaysAccordion';
import programService from '../services/ProgramService';
import { ProgramContext } from '../Context';
import ProgramAccordion from '../components/dataDisplay/ProgramAccordion';
import COLORS from '../styles/colors';
import Loading from '../components/Loading';
import backgroundImage from '../assets/images/workoutEquipment.jpg';

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
    <Container sx={{
      mt: '-2.5rem',
      backgroundImage: `url(${backgroundImage})`,
      minWidth: '100%',
      minHeight: '97.5vh',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      overflow: 'hidden',
    }}
    >
      <ProgramContext.Provider value={programMemo}>
        <ProgramListDrawer
          programs={programList}
          savedPrograms={savedProgramList}
          createProgram={createProgram}
          handleClick={handleDrawerButtonClick}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '90vw' }}>
          {program && selectedProgramType === 'owned'
        && <ProgramDaysAccordion deleteProgram={deleteProgram} programType={selectedProgramType} />}
          {program && selectedProgramType === 'saved'
        && (
          <Box sx={{ ml: '13rem' }}>
            <ProgramAccordion program={program} />
            <Button
              variant="contained"
              sx={{
                float: 'left', ml: '2rem', backgroundColor: COLORS.SECONDARY, '&:hover': { backgroundColor: COLORS.SECONDARY_HOVER },
              }}
              onClick={unfollowProgram}
            >
              Unfollow program
            </Button>
          </Box>
        )}
          {!program
        && (
          <Typography variant="h4" sx={{ mt: '8rem', ml: '6rem' }}>
            Choose a program!
          </Typography>
        )}
        </Box>
      </ProgramContext.Provider>
    </Container>
  );
};

export default ProgramView;
