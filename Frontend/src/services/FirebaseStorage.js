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

const getImageNameFromUrl = (url) => {
  if (url) {
    return decodeURI(url.substring(url.indexOf('/profileImages') + 17, url.indexOf('?')));
  }
  return null;
};

const firebaseStorage = {
  getProfileImage,
  uploadProfileImage,
  getImageNameFromUrl,
};

export default firebaseStorage;
