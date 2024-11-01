import { url } from '../../apiRequest';
import { setLoggedIn, setUserName } from '../../dataSlice';

export const getData = async () => {
  const response = await fetch(url + '/get_main_data/');
  const rsp = await response.json();
  return rsp;
};

export const checkLoginStatus = async (dispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch(url + '/check_login_status/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  const resp = await response.json();

  if (resp.message === 'good') {
    localStorage.setItem('accessToken', resp.access);
    dispatch(setUserName(resp.user_name));
    dispatch(setLoggedIn(true));
  }
};

export const requestSort = (key, sortConfig, setSortConfig) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setSortConfig({ key, direction });
};

export const getSortIndicator = (column, sortConfig) => {
  if (sortConfig.key === column) {
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  }
  return '';
};
