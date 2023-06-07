import axios from 'axios';
import { createFormData } from '../typings/makeForm';

const token = localStorage.getItem('accessToken');

export const createForm = async (data: { userId: number; form: createFormData }) =>
  await axios
    .post(`/form/createform/${data.userId}`, data.form, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
// .catch((err) => console.error(err));
