import {
  Button, Container, TextField, CircularProgress, Chip, Typography, Backdrop,
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
  profileImage: yup.array().required('Please upload an image'),
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
    response.data.profileImage = window.URL.createObjectURL(image);
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
      await firebaseStorage.uploadProfileImage(values.profileImage[0], imageId);
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
      if (application.description) {
        await updateApplication(values);
      } else {
        await postApplication(values);
      }
    },
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ width: '20rem', mt: '7rem' }}>
      <form onSubmit={formik.handleSubmit}>
        {ApplicationFields.slice(0, 3).map((r) => (
          <TextField
            sx={{ m: '10px' }}
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
              <Button
                sx={{ margin: '10px' }}
                variant="contained"
                size="large"
                type="submit"
              >
                Re-Apply
              </Button>
              <Button
                sx={{ margin: '10px' }}
                variant="contained"
                size="large"
                onClick={deleteApplication}
              >
                Delete application
              </Button>
            </>
          )
          : <Button sx={{ margin: '10px' }} variant="contained" size="large" type="submit">Apply</Button>}
      </form>
      {application
      && (
        <>
          <Button variant="contained" size="large" onClick={() => setIsPreviewOpen(true)}>Preview profile</Button>
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
