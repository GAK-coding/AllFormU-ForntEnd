import axios from 'axios';
import { createFormData } from '../typings/makeForm';

export const createForm = async (data: createFormData) =>
  await axios
    .post('/form/createform/1', data)
    .then((res) => res.data)
    .catch((err) => console.error(err));
