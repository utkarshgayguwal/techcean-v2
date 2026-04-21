import api from './axiosInstance';

export const getMessages = async () => {
  const response = await api.get('/contact/messages');
  return response.data;
};

export const getMessageStats = async () => {
  const response = await api.get('/contact/messages/stats');
  return response.data;
};

export const updateMessageStatus = async (id, status) => {
  const response = await api.put(`/contact/messages/${id}`, { status });
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/contact/messages/${id}`);
  return response.data;
};

export default { getMessages, getMessageStats, updateMessageStatus, deleteMessage };