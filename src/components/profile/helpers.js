import { setProfileData, setPhotos } from '../../dataSlice';
import { apiRequest } from '../../apiRequest';

export const getProfileData = async (dispatch, profileId) => {
  const data = await apiRequest('/get_profile_data', { id: profileId });
  dispatch(setProfileData(data.profile_data));
};

export const addRelative = async (newProfile) => {
  apiRequest('/add_relative', { newProfile });
};

export const getRelations = async (profileId, setPossibleRelatives) => {
  const data = await apiRequest('/get_all_relatives', { id: profileId });
  setPossibleRelatives(data.relative_options);
};

export const postProfileEdits = async (profileData) => {
  apiRequest('/update_details', { profileData });
};

export const uploadPhoto = async (data) => {
  apiRequest('/upload_photo', data);
};

export const getPhotos = async (profileId, setPhotos) => {
  const response = await apiRequest('/get_photos', { profileId });
  setPhotos(response.photos);
};

export const relationOptions = [
  { value: 'Parent', label: 'Parent' },
  { value: 'Sibling', label: 'Sibling' },
  { value: 'Child', label: 'Child' },
  { value: 'Spouse', label: 'Spouse' },
];
