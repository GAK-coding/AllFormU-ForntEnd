import axios from 'axios';
import { ResDescription, ResSelection } from '../typings/resForm';

export const createDescription = async (data: { formId: number; memberId: number; forms: ResDescription[] }) => {
  try {
    const { formId, memberId, forms } = data;

    await axios.post(`/description/createDescription/${formId}/${memberId}`, forms);
  } catch (err) {
    console.log(err);
  }
};

export const createSelection = async (data: { formId: number; memberId: number; forms: ResSelection[] }) => {
  try {
    const { formId, memberId, forms } = data;

    await axios.post(`/response/${formId}/${memberId}`, forms);
  } catch (err) {
    console.log(err);
  }
};
