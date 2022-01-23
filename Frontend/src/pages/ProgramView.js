import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import ProgramListDrawer from '../components/dataDisplay/ProgramListDrawer';
import API from '../API/API';
import ProgramDaysAccordion from '../components/dataDisplay/ProgramDaysAccordion';
import ProgramContext from '../Context';

const ProgramView = () => {
  const [programNames, setProgramNames] = useState([]);
  const [program, setProgram] = useState(null);

  const programMemo = useMemo(() => ({ program, setProgram }), [program]);

  const handleDrawerButtonClick = async (id) => {
    await API.get(`/users/1/programs/${id}`)
      .then((result) => setProgram(result.data));
  };

  useEffect(async () => {
    await API.get('/users/1/programs')
      .then((result) => {
        setProgramNames(result.data);
      });
  }, [program]);

  return (
    <Container>
      <ProgramListDrawer programs={programNames} handleClick={handleDrawerButtonClick} />
      <ProgramContext.Provider value={programMemo}>
        {!program
          ? <Typography>Choose a program!</Typography>
          : <ProgramDaysAccordion />}
      </ProgramContext.Provider>
    </Container>
  );
};

export default ProgramView;
