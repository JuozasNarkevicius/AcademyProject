import {
  Container, TextField, Chip, Typography, Backdrop, CssBaseline, Box,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import applicationService from '../services/ApplicationService';
import userService from '../services/UserService';
import STATUS_COLORS from '../constants/statusColors';
import ProfileCard from '../components/dataDisplay/ProfileCard';
import FileUpload from '../components/FileUpload';
import firebaseStorage from '../services/FirebaseStorage';
import Loading from '../components/Loading';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import Button from '../components/Button';

const ApplicationFields = [
  { name: 'description', label: 'Description', type: 'text' },
  { name: 'qualifications', label: 'Qualifications', type: 'text' },
  { name: 'phoneNumber', label: 'Phone number', type: 'text' },
  { name: 'ImageId', label: 'Profile image', type: 'array' },
];

const validationSchema = yup.object({
  description: yup.string().required('Enter a description'),
  qualifications: yup.string().required('Enter your qualifications'),
  phoneNumber: yup.string().required('Enter your phone number'),
});

const TrainerApplication = () => {
  const [application, setApplication] = useState({
    description: '', qualifications: '', ImageId: [], phoneNumber: '',
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getApplication = async () => {
    const response = await applicationService.getCurrentUserApplicationAPI();
    setApplication(response.data);
  };

  const postApplication = async (values) => {
    await firebaseStorage.uploadProfileImage(values.imageId[0], values.imageId[0].name);
    const imageUrl = await firebaseStorage.getProfileImage(values.imageId[0].name);
    const response = await userService.getCurrentUserAPI();
    const trainerApplication = {
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      description: values.description,
      qualifications: values.qualifications,
      phoneNumber: values.phoneNumber,
      imageId: imageUrl,
    };
    const applicationWithId = await applicationService.postApplicationAPI(trainerApplication);
    setApplication(applicationWithId.data);
  };

  const deleteApplication = async () => {
    await applicationService.deleteApplicationAPI(application.id);
    setApplication({
      description: '', qualifications: '', ImageId: [], phoneNumber: '',
    });
  };

  const updateApplication = async (values) => {
    if (values.imageId[0] instanceof File) {
      await firebaseStorage.uploadProfileImage(values.imageId[0], values.imageId[0].name);
      const imageUrl = await firebaseStorage.getProfileImage(values.imageId[0].name);
      values.imageId = imageUrl;
      await applicationService.updateApplicationAPI(application.id, { ...values, status: 'pending' });
    } else {
      await applicationService.updateApplicationAPI(application.id, { ...values, status: 'pending' });
    }
    await getApplication();
  };

  useEffect(() => {
    getApplication();
    setIsLoading(false);
  }, []);

  const formik = useFormik({
    enableReinitialize: application.description,
    initialValues: {
      description: application.description,
      qualifications: application.qualifications,
      phoneNumber: application.phoneNumber,
      imageId: application.imageId,
    },
    validationSchema,
    onSubmit: async (values) => {
      setApplication(values);
      if (application.description) {
        await updateApplication(values);
      } else {
        await postApplication(values);
      }
    },
  });

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
      <CssBaseline />
      <Box sx={{
        display: 'flex', justifyContent: 'center', marginTop: '15vh',
      }}
      >
        <form onSubmit={formik.handleSubmit} style={{ maxWidth: '20rem' }}>
          {ApplicationFields.slice(0, 3).map((r) => (
            <TextField
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              variant="filled"
              sx={{
                m: '10px', backgroundColor: '#2d2b2b', color: 'white',
              }}
              key={r.name}
              name={r.name}
              label={r.label}
              type={r.type}
              value={formik.values[r.name]}
              onChange={formik.handleChange}
              error={formik.touched[r.name] && Boolean(formik.errors[r.name])}
              helperText={formik.touched[r.name] && formik.errors[r.name]}
            />
          ))}
          <FileUpload
            name="imageId"
            value={formik.values.imageId}
            setFieldValue={formik.setFieldValue}
            helperText={formik.touched.imageId && formik.errors.imageId}
            error={formik.touched.imageId && Boolean(formik.errors.imageId)}
          />
          <Typography>
            Status:
            <Chip
              sx={{ ml: 1 }}
              label={application.status || 'not applied'}
              color={STATUS_COLORS[application.status]}
              variant="outlined"
            />
          </Typography>
          {application.description
            ? (
              <>
                <Button text="Re-Apply" type="submit" />
                <Button text="Delete application" onClick={deleteApplication} width="10rem" type="button" />
              </>
            )
            : <Button text="Apply" type="submit" />}
        </form>
      </Box>
      {application.description
      && (
        <>
          <Button text="Preview profile" onClick={() => setIsPreviewOpen(true)} width="10rem" />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isPreviewOpen}
            onClick={() => setIsPreviewOpen(false)}
          >
            <ProfileCard trainer={application} />
          </Backdrop>
        </>
      )}
    </Container>
  );
};

export default TrainerApplication;
