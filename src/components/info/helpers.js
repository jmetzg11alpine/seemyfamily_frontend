import { apiRequest } from '../../apiRequest';

export const getEdits = async (setData) => {
  const response = await apiRequest('/get_edits');
  setData(response.data);
};

export const getVisitors = async (setChartData, selectedRange) => {
  const response = await apiRequest('/get_visitors/', selectedRange);
  setChartData(response.data);
};
