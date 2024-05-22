import gateway from '../config/gateway';

export const postText = (data) => gateway.post('/posts', data);

export const getUserText = (id) => gateway.get(`/posts?userId=${id}`);
