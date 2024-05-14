import gateway from '../config/gateway';

export const getAllUser = () => gateway.get('/users');

export const postUser = (data) =>
  gateway.post('/users', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const checkUserValid = (email, password) =>
  gateway.get(`/users?email=${email}&password=${password}`);
