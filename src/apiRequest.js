export const url = process.env.REACT_APP_API;
export const urlMedia = process.env.REACT_APP_MEDIA;

export const apiRequest = async (endpoint, body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const response = await fetch(url + endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });

  return await response.json();
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await fetch(url + '/token/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Unable to refresh token');
  }

  const data = await response.json();
  localStorage.setItem('accessToken', data.access);
  return data.access;
};

export const apiAuthRequest = async (endpoint, body) => {
  let token = localStorage.getItem('accessToken');
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  let response = await fetch(url + endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    try {
      token = await refreshToken();
      headers.Authorization = `Bearer ${token}`;

      response = await fetch(url + endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log('Token refresh failed:', err);
      return { error: 'Authentication failed' };
    }
  }

  return await response.json();
};
