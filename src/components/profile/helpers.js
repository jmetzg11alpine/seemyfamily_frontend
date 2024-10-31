import { setProfileData } from '../../dataSlice';
import { apiRequest, apiAuthRequest } from '../../apiRequest';

export const getProfileData = async (dispatch, profileId) => {
  const data = await apiRequest('/get_profile_data/', { id: profileId });
  dispatch(setProfileData(data.profile_data));
};

export const addRelative = async (newProfile) => {
  await apiAuthRequest('/add_relative/', { newProfile });
};

export const getRelations = async (profileId, setPossibleRelatives) => {
  const data = await apiRequest('/get_all_relatives/', { id: profileId });
  setPossibleRelatives(data.relative_options);
};

export const postProfileEdits = async (profileData) => {
  await apiAuthRequest('/update_details/', { profileData });
};

export const deleteProfile = async (profileData) => {
  apiAuthRequest('/delete_profile/', { profileData });
};

export const relationOptions = [
  { value: 'Parent', label: 'Parent' },
  { value: 'Sibling', label: 'Sibling' },
  { value: 'Child', label: 'Child' },
  { value: 'Spouse', label: 'Spouse' },
];
