import { apiRequest } from '../../apiRequest';
import { setLoggedIn, setUserName } from '../../dataSlice';
export const url = process.env.REACT_APP_API;

export const logIn = async (credentials, dispatch, setMainBody) => {
  const resp = await apiRequest('/custom_login/', credentials);
  if (resp.message === 'Invalid credentials') {
    setMainBody(false);
    return 'continue';
  } else {
    dispatch(setLoggedIn(true));
    dispatch(setUserName('donkey'));
    localStorage.setItem('accessToken', resp.access);
    localStorage.setItem('refreshToken', resp.refresh);
    return 'close';
  }
};

export const logOut = (dispatch) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  dispatch(setLoggedIn(false));
  dispatch(setUserName(''));
};
