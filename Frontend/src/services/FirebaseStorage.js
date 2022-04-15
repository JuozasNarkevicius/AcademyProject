import {
  getDownloadURL, getStorage, ref, uploadBytes,
} from 'firebase/storage';

const getProfileImage = async (imageId) => {
  const storage = getStorage();
  const response = await getDownloadURL(ref(storage, `profileImages/${imageId}`));
  return response;
};

const uploadProfileImage = async (file, imageId) => {
  const storage = getStorage();
  const storageRef = ref(storage, `profileImages/${imageId}`);
  await uploadBytes(storageRef, file);
};

const convertIfImageFile = (image) => {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  return image;
};

const firebaseStorage = {
  getProfileImage,
  uploadProfileImage,
  convertIfImageFile,
};

export default firebaseStorage;
