/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {
  Container, TextField, Chip, Typography, Backdrop, CssBaseline, Box,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  { name: 'profileImage', label: 'Profile image', type: 'array' },
];

const validationSchema = yup.object({
  description: yup.string().required('Enter a description'),
  qualifications: yup.string().required('Enter your qualifications'),
  phoneNumber: yup.string().required('Enter your phone number'),
});

const TrainerApplication = () => {
  const [application, setApplication] = useState({
    description: '', qualifications: '', profileImage: [], phoneNumber: '',
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getApplication = async () => {
    const response = await applicationService.getCurrentUserApplicationAPI();
    const image = await firebaseStorage.getProfileImage(response.data.imageId);
    const file = new File([image], 'name');
    response.data.profileImage = file;
    setApplication(response.data);
  };

  const postApplication = async (values) => {
    const imageId = uuidv4();
    await firebaseStorage.uploadProfileImage(values.profileImage[0], imageId);
    const response = await userService.getCurrentUserAPI();

    await applicationService.postApplicationAPI({
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      description: values.description,
      qualifications: values.qualifications,
      phoneNumber: values.phoneNumber,
      imageId,
    });
    await getApplication();
  };

  const deleteApplication = async () => {
    await applicationService.deleteApplicationAPI(application.id);
    setApplication({
      description: '', qualifications: '', profileImage: [], phoneNumber: '',
    });
  };

  const updateApplication = async (values) => {
    const imageId = uuidv4();
    if (values.profileImage) {
      await firebaseStorage.uploadProfileImage(values.profileImage, imageId);
      const { profileImage, ...valuesToPost } = values;
      valuesToPost.imageId = imageId;
      await applicationService.updateApplicationAPI(application.id, { ...valuesToPost, status: 'pending' });
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
      profileImage: application.profileImage,
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
            name="profileImage"
            value={formik.values.profileImage}
            setFieldValue={formik.setFieldValue}
            helperText={formik.touched.profileImage && formik.errors.profileImage}
            error={formik.touched.profileImage && Boolean(formik.errors.profileImage)}
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
