import axios from 'axios';
import { createFormData } from '../typings/makeForm';

const token = localStorage.getItem('accessToken');

export const createForm = async (data: createFormData) =>
  await axios
    .post('/form/createform/1', data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
// .catch((err) => console.error(err));
