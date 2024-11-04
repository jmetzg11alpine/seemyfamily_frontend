import { apiRequest, apiAuthRequest } from '../../apiRequest';

export const uploadPhoto = async (data) => {
  return await apiAuthRequest('/upload_photo/', data);
};

export const getPhotos = async (profileId, setPhotos) => {
  const response = await apiRequest('/get_photos/', { profileId });
  setPhotos(response.photos);
};

export const editPhoto = async (photoInfo) => {
  await apiAuthRequest('/edit_photo/', photoInfo);
};

export const deletePhoto = async (photoInfo) => {
  await apiAuthRequest('/delete_photo/', photoInfo);
};
