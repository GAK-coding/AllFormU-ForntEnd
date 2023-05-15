import axios from 'axios';

export const editFormInfo = async (userId: number, formId: number, title: string, content: string) =>
  await axios
    .put(`/form/updateSelectform/${userId}/${formId}`, {
      title,
      content,
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));

export const deleteQue = async (formId: number, queId: number) => {
  try {
    await axios.delete(`/question/DeleteSelectquestion/${formId}/${queId}`);
  } catch (error) {
    console.error(error);
  }
};
