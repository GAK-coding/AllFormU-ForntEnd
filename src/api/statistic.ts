import axios from 'axios';
import { DescriptionResStatistic } from '../typings/statistic';

export const getQueResCount = async (question_id: number) => {
  try {
    const res: { data: { count: number } } = await axios.get(`/description/statistic/${question_id}/count`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getStatisticEach = async (question_id: number) => {
  try {
    const res: { data: DescriptionResStatistic } = await axios.get(`/description/statistic/${question_id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
