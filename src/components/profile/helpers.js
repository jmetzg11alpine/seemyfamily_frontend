import { setProfileData } from '../../dataSlice';
const url = process.env.REACT_APP_API;

export const getProfileData = async (dispatch, profileId) => {
  const response = await fetch(url + '/get_profile_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: profileId }),
  });
  const data = await response.json();
  dispatch(setProfileData(data.profile_data));
};

export const addRelative = async (newProfile) => {
  const response = await fetch(url + '/add_relative', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newProfile }),
  });
  const data = await response.json();
  console.log(data.message);
};

export const getRelations = async (profileId, setPossibleRelatives) => {
  const response = await fetch(url + '/get_all_relatives', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: profileId }),
  });
  const data = await response.json();
  setPossibleRelatives(data.relative_options);
};

export const postProfileEdits = async (profileData) => {
  console.log(profileData);
  const response = await fetch(url + '/update_details', {
    method: 'POST',
    headers: {
      'Content-Type': 'applicatioin/json',
    },
    body: JSON.stringify({ profileData }),
  });
  const data = await response.json();
  console.log(data.message);
};

export const relationOptions = [
  { value: 'Parent', label: 'Parent' },
  { value: 'Sibling', label: 'Sibling' },
  { value: 'Child', label: 'Child' },
  { value: 'Spouse', label: 'Spouse' },
];
