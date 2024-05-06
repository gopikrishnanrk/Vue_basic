export const isEmailValid = (string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);

export const isPhoneNoValid = (string) => /^\d{10}$/.test(string);

export const isDateValid = (date) => new Date(date) > new Date();

export const comparePassword = (password, confirmPassword) =>
  password !== confirmPassword;
