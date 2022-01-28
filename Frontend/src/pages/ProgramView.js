import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import ProgramListDrawer from '../components/dataDisplay/ProgramListDrawer';
import ProgramDaysAccordion from '../components/dataDisplay/ProgramDaysAccordion';
import { programService } from '../services/ProgramService';
import { ProgramContext } from '../Context';

const ProgramView = () => {
  const [programNames, setProgramNames] = useState([]);
  const [program, setProgram] = useState(null);

  const programMemo = useMemo(() => ({ program, setProgram }), [program]);

  const handleDrawerButtonClick = async (id) => {
    const response = await programService.getProgramAPI(id);
    setProgram(response.data);
  };

  useEffect(async () => {
    const response = await programService.getAllProgramsAPI();
    setProgramNames(response.data);
  }, [program]);

  return (
    <Container>
      <ProgramListDrawer programs={programNames} handleClick={handleDrawerButtonClick} />
      <ProgramContext.Provider value={programMemo}>
        {program
          ? <ProgramDaysAccordion />
          : <Typography>Choose a program!</Typography>}
      </ProgramContext.Provider>
    </Container>
  );
};

export default ProgramView;
