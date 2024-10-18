export const url = process.env.REACT_APP_API;

export const apiRequest = async (endpoint, body) => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(url + endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });

  return await response.json();
};
