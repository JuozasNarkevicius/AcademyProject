import React, { useState, useEffect, useMemo } from 'react';
import {
  Container, Typography, Button, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ProgramListDrawer from '../components/dataDisplay/ProgramListDrawer';
import ProgramDaysAccordion from '../components/dataDisplay/ProgramDaysAccordion';
import programService from '../services/ProgramService';
import { ProgramContext } from '../Context';
import ProgramAccordion from '../components/dataDisplay/ProgramAccordion';
import COLORS from '../styles/colors';
import Loading from '../components/Loading';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import userService from '../services/UserService';

const ProgramView = () => {
  const [programList, setProgramList] = useState([]);
  const [savedProgramList, setSavedProgramList] = useState([]);
  const [program, setProgram] = useState(null);
  const [selectedProgramType, setSelectedProgramType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const programMemo = useMemo(() => ({ program, setProgram }), [program]);

  const createProgram = async () => {
    const newProgram = {
      name: 'New Program',
    };
    const response = await programService.postProgramAPI(newProgram.name);
    const program = await programService.getProgramAPI(response.data.id);
    newProgram.id = response.data.id;
    setProgram(program.data);
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

  const getPrograms = async () => {
    try {
      const allPrograms = await programService.getAllProgramsAPI();
      const allSavedPrograms = await programService.getAllSavedProgramsAPI();
      setProgramList(allPrograms.data);
      setSavedProgramList(allSavedPrograms.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate(-1);
      }
    }
    setIsLoading(false);
  };

  const unfollowProgram = async () => {
    setProgram(null);
    await programService.deleteSavedProgramAPI(program.id);
    await getPrograms();
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

  useEffect(() => {
    getPrograms();
  }, [program]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{
      backgroundImage: `url(${backgroundImage})`,
      minWidth: '100%',
      minHeight: '92.3vh',
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
        && (
          <ProgramDaysAccordion
            deleteProgram={deleteProgram}
            programType={selectedProgramType}
            getPrograms={getPrograms}
          />
        )}
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
            <Button
              variant="contained"
              sx={{
                float: 'left', ml: '2rem', backgroundColor: COLORS.SECONDARY, '&:hover': { backgroundColor: COLORS.SECONDARY_HOVER },
              }}
              onClick={getProgramPdf}
            >
              Download PDF
            </Button>
            <Button
              variant="contained"
              sx={{
                float: 'left', ml: '2rem', backgroundColor: COLORS.SECONDARY, '&:hover': { backgroundColor: COLORS.SECONDARY_HOVER },
              }}
              onClick={sendProgramPdfToEmail}
            >
              Send PDF to Email
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
