/* eslint-disable max-lines */
import {
  Container, TextField, Chip, Typography, Backdrop, CssBaseline, Box, Card, CircularProgress,
} from '@mui/material';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import applicationService from '../services/ApplicationService';
import userService from '../services/UserService';
import STATUS_COLORS from '../constants/statusColors';
import ProfileCard from '../components/dataDisplay/ProfileCard';
import FileUpload from '../components/FileUpload';
import firebaseStorage from '../services/FirebaseStorage';
import Loading from '../components/Loading';
import backgroundImage from '../assets/images/workoutEquipment.jpg';
import Button from '../components/Button';
import COLORS from '../styles/colors';

const ApplicationFields = [
  { name: 'description', label: 'Description', type: 'text' },
  { name: 'qualifications', label: 'Qualifications', type: 'text' },
  { name: 'phoneNumber', label: 'Phone number', type: 'text' },
  { name: 'specializations', label: 'Specializations', type: 'text' },
  { name: 'workExperience', label: 'Work Experience', type: 'text' },
  { name: 'ImageId', label: 'Profile image', type: 'array' },
];

const validationSchema = yup.object({
  description: yup.string().required('Enter a description'),
  qualifications: yup.string().required('Enter your qualifications'),
  specializations: yup.string().required('Enter your specializations'),
  workExperience: yup.string().required('Enter your work experience'),
  phoneNumber: yup.string().required('Enter your phone number'),
});

const TrainerApplication = () => {
  const [application, setApplication] = useState({
    description: '', qualifications: '', imageId: [], phoneNumber: '', specializations: '', workExperience: '',
  });
  const [imageName, setImageName] = useState();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const navigate = useNavigate();

  const getApplication = async () => {
    try {
      const response = await applicationService.getCurrentUserApplicationAPI();
      setImageName(firebaseStorage.getImageNameFromUrl(response.data.imageId));
      setApplication(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate(-1);
      }
    }
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
      specializations: values.specializations,
      workExperience: values.workExperience,
      imageId: imageUrl,
    };
    const applicationWithId = await applicationService.postApplicationAPI(trainerApplication);
    setApplication(applicationWithId.data);
    setIsStatusLoading(false);
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
    setIsStatusLoading(false);
  };

  useEffect(() => {
    getApplication();
    setIsLoading(false);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: application.description || '',
      qualifications: application.qualifications || '',
      phoneNumber: application.phoneNumber || '',
      specializations: application.specializations || '',
      workExperience: application.workExperience || '',
      imageId: application.imageId || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setApplication(values);
      setIsStatusLoading(true);
      if (application.description) {
        await updateApplication(values);
      } else {
        await postApplication(values);
      }
    },
  });

  const deleteApplication = async () => {
    setIsStatusLoading(true);
    await applicationService.deleteApplicationAPI(application.id);
    await getApplication();
    setIsStatusLoading(false);
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '30rem', pb: '0.5rem' }}>
          <Box sx={{
            display: 'flex', justifyContent: 'center', marginTop: '5vh',
          }}
          >
            <form onSubmit={formik.handleSubmit} style={{ maxWidth: '30rem' }}>
              {ApplicationFields.slice(0, 5).map((r) => (
                <TextField
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}
                  variant="filled"
                  sx={{
                    m: '10px', backgroundColor: '#2d2b2b', color: 'white', width: '23rem',
                  }}
                  multiline
                  maxRows={6}
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
                imageName={imageName}
                setImageName={setImageName}
                setFieldValue={formik.setFieldValue}
                helperText={formik.touched.imageId && formik.errors.imageId}
                error={formik.touched.imageId && Boolean(formik.errors.imageId)}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ backgroundColor: COLORS.ITEM, width: '13rem', p: '0.5rem' }}>
                  <Typography>
                    Status:
                    {isStatusLoading
                      ? <CircularProgress sx={{ color: COLORS.TEXT, ml: '10px' }} size="1rem" />
                      : (
                        <Chip
                          sx={{ ml: 1, fontSize: '19px' }}
                          label={application.status || 'not applied'}
                          color={STATUS_COLORS[application.status]}
                          variant="outlined"
                        />
                      )}
                  </Typography>
                </Card>
              </Box>
              {application.description
                ? (
                  <>
                    <Button text="Re-Apply" type="submit" />
                    <Button
                      text="Delete application"
                      onClick={() => {
                        deleteApplication();
                        formik.resetForm();
                      }}
                      width="10rem"
                      type="button"
                    />
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
            <ProfileCard trainer={application} isLoading={isLoading} />
          </Backdrop>
        </>
      )}
        </Card>
      </Box>
    </Container>
  );
};

export default TrainerApplication;
