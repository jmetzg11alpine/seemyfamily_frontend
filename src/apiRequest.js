export const url = process.env.REACT_APP_API;

export const apiRequest = async (endpoint, body) => {
  const response = await fetch(url + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
