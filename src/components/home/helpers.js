export const getData = async () => {
  const url = process.env.REACT_APP_API;
  const response = await fetch(url + '/get_main_data/');
  const rsp = await response.json();
  return rsp;
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
