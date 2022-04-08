import {
  getBlob, getStorage, ref, uploadBytes,
} from 'firebase/storage';

const getProfileImage = async (imageId) => {
  const storage = getStorage();
  const response = await getBlob(ref(storage, `profileImages/${imageId}`));
  return response;
};

const uploadProfileImage = async (file, imageId) => {
  const storage = getStorage();
  const storageRef = ref(storage, `profileImages/${imageId}`);
  await uploadBytes(storageRef, file);
};

const firebaseStorage = {
  getProfileImage,
  uploadProfileImage,
};

export default firebaseStorage;
