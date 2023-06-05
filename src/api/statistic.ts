import axios from 'axios';
import { DescriptionResStatistic, SelectionResStatistic } from '../typings/statistic';

export const getDescriptionResCount = async (question_id: number) => {
  try {
    const res: { data: { count: number } } = await axios.get(`/description/statistic/${question_id}/count`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getDescriptionStatisticEach = async (question_id: number) => {
  try {
    const res: { data: DescriptionResStatistic } = await axios.get(`/description/statistic/${question_id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSelectionResCount = async (question_id: number) => {
  try {
    const res: { data: { count: number } } = await axios.get(`/response/${question_id}/count`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSelectionStatisticEach = async (question_id: number) => {
  try {
    const res: { data: SelectionResStatistic } = await axios.get(`/response/${question_id}/statistic`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
