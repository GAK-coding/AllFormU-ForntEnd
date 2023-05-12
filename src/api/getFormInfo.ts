import axios from 'axios';

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
    .then((res) => alert('폼 삭제 성공!'))
    .catch((err) => console.error(err));

export const getFormInfo = async (userId: number, formId: number) =>
  await axios
    .get(`/form/findform/${userId}/${formId}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
