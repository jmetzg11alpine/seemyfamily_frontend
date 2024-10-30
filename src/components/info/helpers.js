import { apiRequest } from '../../apiRequest';

export const getEdits = async (setData) => {
  const response = await apiRequest('/get_edits');
  setData(response.data);
};
