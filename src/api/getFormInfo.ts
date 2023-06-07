import axios from 'axios';
import { makePagingData } from '../typings/getForm';

const token = localStorage.getItem('accessToken');

export const getMakeForms = async (userId: number) =>
  await axios
    .get(`/form/findform/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error(err));

export const deleteFrom = async (id: number) =>
  await axios
    .delete(`/form/deleteform/1/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => true)
    .catch((err) => console.error(err));

export const getFormInfo = async (userId: number, formId: number) =>
  await axios
    .get(`/form/findform/${userId}/${formId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));

export const getPagingInfo = async (data: { userId: number; pageParam: number }) => {
  try {
    const { userId, pageParam } = data;

    const res: { data: { nextPage: boolean; pagingData: makePagingData[] } } = await axios.get(
      `/form/pages/${userId}/${pageParam}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
