import axios from 'axios';

export const editFormInfo = async (userId: number, formId: number, title: string, content: string) =>
  await axios
    .put(`/form/updateSelectform/${userId}/${formId}`, {
      title,
      content,
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
