import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import userService from '../services/UserService';
import ROUTES from '../constants/Routes';
import Loading from '../components/Loading';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import Button from '../components/Button';
import ProfileCard from '../components/dataDisplay/ProfileCard';

const TrainerApplicationView = () => {
  const [application, setApplication] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const getApplication = async () => {
    const response = await applicationService.getApplicationAPI(id);
    setApplication(response.data);
    setIsLoading(false);
  };

  const approveTrainer = async () => {
    await userService.changeUserRoleAPI(application.userId, 'trainer');
    await applicationService.changeApplicationStatusAPI(application.id, 'verified');
    navigate(ROUTES.TRAINER_APPLICATION_LIST);
  };

  const declineTrainer = async () => {
    await applicationService.changeApplicationStatusAPI(application.id, 'declined');
    navigate(ROUTES.TRAINER_APPLICATION_LIST);
  };

  useEffect(() => {
    getApplication();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{
      minWidth: '100%',
      minHeight: '93vh',
      paddingTop: '2rem',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ProfileCard trainer={application} />
      </Box>
      {application.status === 'pending' ? (
        <>
          <Button text="Approve" onClick={approveTrainer} />
          <Button text="Dismiss" onClick={declineTrainer} />
        </>
      ) : (
        <Button
          text="Take away trainer status"
          onClick={declineTrainer}
          width="11rem"
        />
      )}
    </Container>
  );
};

export default TrainerApplicationView;
