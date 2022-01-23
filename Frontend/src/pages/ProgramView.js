import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import ProgramListDrawer from '../components/dataDisplay/ProgramListDrawer';
import baseAdress from '../API/BaseAddress';
import ProgramDaysAccordion from '../components/dataDisplay/ProgramDaysAccordion';
import ProgramContext from '../Context';

const ProgramView = () => {
  const [programNames, setProgramNames] = useState([]);
  const [program, setProgram] = useState(null);

  const programMemo = useMemo(() => ({ program, setProgram }), [program]);

  const handleDrawerButtonClick = async (id) => {
    await axios.get(`${baseAdress}/users/1/programs/${id}`, { withCredentials: true })
      .then((result) => setProgram(result.data));
  };

  useEffect(async () => {
    await axios.get(`${baseAdress}/users/1/programs`, { withCredentials: true })
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
