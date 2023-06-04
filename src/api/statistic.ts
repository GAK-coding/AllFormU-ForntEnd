import axios from 'axios';

export const getQueResCount = async (question_id: number) => {
  try {
    const res: { data: { count: number } } = await axios.get(`/description/statistic/${question_id}/count`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
