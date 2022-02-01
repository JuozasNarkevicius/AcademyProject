import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import ProgramListDrawer from '../components/dataDisplay/ProgramListDrawer';
import ProgramDaysAccordion from '../components/dataDisplay/ProgramDaysAccordion';
import { programService } from '../services/ProgramService';
import { ProgramContext } from '../Context';

const ProgramView = () => {
  const [programList, setProgramList] = useState([]);
  const [program, setProgram] = useState(null);

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

  const handleDrawerButtonClick = async (id) => {
    const response = await programService.getProgramAPI(id);
    setProgram(response.data);
  };

  useEffect(async () => {
    const response = await programService.getAllProgramsAPI();
    setProgramList(response.data);
  }, [program]);

  return (
    <Container>
      <ProgramContext.Provider value={programMemo}>
        <ProgramListDrawer
          programs={programList}
          createProgram={createProgram}
          handleClick={handleDrawerButtonClick}
        />
        {program
          ? <ProgramDaysAccordion deleteProgram={deleteProgram} />
          : <Typography variant="h4" sx={{ mt: '8rem' }}>Choose a program!</Typography>}
      </ProgramContext.Provider>
    </Container>
  );
};

export default ProgramView;
