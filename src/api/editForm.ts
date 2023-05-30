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

export const selectInfoUpdate = async (
  formId: number,
  queId: number,
  title?: string,
  required?: boolean,
  sectionNum?: number
) => {
  try {
    await axios.put(`/question/UpdateSelectQuestion/${formId}/${queId}`, {
      title,
      required,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateContent = async (formId: number, queId: number, content: string) => {
  try {
    await axios.put(`/selection/updateContent/${formId}/${queId}`, {
      content,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteContent = async (optId: number) => {
  try {
    await axios.delete(`/selection/deleteSelection/${optId}`);
  } catch (error) {
    console.error(error);
  }
};

export const addContent = async (data: { queId: number; content: string }) => {
  try {
    const { queId, content } = data;
    const { data: id } = await axios.post(`/selection/createSelection/${queId}`, { content });

    // if (linear) return id;

    return id[id.length - 1];
  } catch (error) {
    console.error(error);
  }
};
