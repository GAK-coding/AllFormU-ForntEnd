import { GetFormInfo } from '../typings/getForm';
import { DescriptionQue, GridQue, SelectionQue } from '../typings/makeForm';
import { v4 as uuid } from 'uuid';

export const customData = (data: GetFormInfo) => {
  const tempQues: (DescriptionQue | SelectionQue | GridQue)[][] = [];

  data?.questions?.map((que) => {
    const { sectionNum } = que;

    if (tempQues[sectionNum] === undefined) tempQues[sectionNum] = [];
    tempQues[sectionNum].push({ ...que, tempId: uuid() });
  });

  return tempQues;
};
