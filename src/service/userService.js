import axios from 'axios';
import gateway from '../config/gateway';
// import { googleClientID, googleClientSecret } from '../main';

export const getAllUser = () => gateway.get('/users');

export const postUser = (data) => gateway.post('/users', data);

export const checkUserValid = (email, password) =>
  gateway.get(`/users?email=${email}&password=${password}`);

export const isgoogleIdValid = (email) => gateway.get(`/users?email=${email}`);

// export const getAccessToken = async (code) =>
//   await axios.post('https://oauth2.googleapis.com/token', {
//     code: code,
//     client_id: googleClientID,
//     client_secret: googleClientSecret,
//     redirect_uri: '',
//     grant_type: 'authorization_code',
//   });

// export const googleUserInfo = async (accessToken) =>
//   await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

// function getUserEmail(code) {
//   try {
//     const tokenResponse = async () => await getAccessToken(code);
//     debugger;
//     const accessToken = tokenResponse.data.access_token;

//     const value = googleUserInfo(accessToken);

//     const userEmail = userInfoResponse.data.email;
//     return userEmail;
//   } catch (error) {
//     console.error(
//       'Error getting user email:',
//       error.response ? error.response.data : error.message
//     );
//     throw error;
//   }
// }
