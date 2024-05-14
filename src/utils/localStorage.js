export const getUserDetails = () =>
  JSON.parse(localStorage.getItem('userDetails'));

export const setUserDetails = (value) => {
  const formattedVal = JSON.stringify(value);
  localStorage.setItem('userDetails', formattedVal);
};

export const removeUserDetails = () => localStorage.removeItem('userDetails');
