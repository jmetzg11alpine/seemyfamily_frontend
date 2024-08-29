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
