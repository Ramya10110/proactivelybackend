import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const createForm = (data, token) =>
  axios.post(`${API_URL}/admin/forms`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getAdminForms = (token) =>
  axios.get(`${API_URL}/admin/forms`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const joinForm = (inviteCode, token) =>
  axios.post(`${API_URL}/forms/join`, { inviteCode }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getFormResponse = (formId, token) =>
  axios.get(`${API_URL}/forms/${formId}/response`, {
    headers: { Authorization: `Bearer ${token}` }
  });
