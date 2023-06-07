import axios from 'axios';
import { ResDescription, ResSelection } from '../typings/resForm';

const token = localStorage.getItem('accessToken');

export const createDescription = async (data: { formId: number; memberId: number; forms: ResDescription[] }) => {
  try {
    const { formId, memberId, forms } = data;

    const response = await axios.post(`/description/createDescription/${formId}/${memberId}`, forms, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    // console.log(err);
  }
};

export const createSelection = async (data: { formId: number; memberId: number; forms: ResSelection[] }) => {
  try {
    const { formId, memberId, forms } = data;

    const response = await axios.post(`/response/${formId}/${memberId}`, forms, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    // console.log(err);
  }
};
