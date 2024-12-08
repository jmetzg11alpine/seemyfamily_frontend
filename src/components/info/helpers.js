import { apiRequest } from '../../apiRequest';

export const getEdits = async (setData) => {
  const response = await apiRequest('/get_edits/');
  setData(response.data);
};

export const getVisitors = async (setChartData, selectedRange) => {
  const response = await apiRequest('/get_visitors/', selectedRange);
  setChartData(response.data);
};

const makeFileDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}_${month}_${day}`;
};

export const downloadSQL = async () => {
  const endpointUrl = process.env.REACT_APP_API;
  const headers = {
    'Content-Type': 'application/json',
  };
  const response = await fetch(endpointUrl + '/download_sql/', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(''),
  });
  if (!response.ok) {
    throw new Error('Failed to download SQL file');
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'seemyfamily_' + makeFileDate() + '.sql';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const downLoadPhotos = async () => {
  const endpointUrl = process.env.REACT_APP_API;
  const headers = {
    'Content-Type': 'application/json',
  };
  const response = await fetch(endpointUrl + '/download_photos/', {
    method: 'POST',
    headers: headers,
  });
  if (!response.ok) {
    throw new Error('Failed to download zip of photos');
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'seemyfamily_photos_' + makeFileDate() + '.zip';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
