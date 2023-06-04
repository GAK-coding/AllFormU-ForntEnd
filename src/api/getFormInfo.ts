import axios from 'axios';
import { makePagingData } from '../typings/getForm';

export const getMakeForms = async () =>
  await axios
    .get('/form/findform/1')
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error(err));

export const deleteFrom = async (id: number) =>
  await axios
    .delete(`/form/deleteform/1/${id}`)
    .then((res) => true)
    .catch((err) => console.error(err));

export const getFormInfo = async (userId: number, formId: number) =>
  await axios
    .get(`/form/findform/${userId}/${formId}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));

export const getPagingInfo = async (data: { userId: number; pageParam: number }) => {
  try {
    const { userId, pageParam } = data;

    const res: { data: { nextPage: boolean; pagingData: makePagingData[] } } = await axios.get(
      `/form/pages/${userId}/${pageParam}`
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
