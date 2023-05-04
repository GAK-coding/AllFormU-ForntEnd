import { atom } from 'recoil';
import {
  FormInfo,
  DescriptionQue,
  SelectionQue,
  GridQue,
  DESCRIPTION_SHORT,
  DESCRIPTION_LONG,
  DESCRIPTION_DATE,
  DESCRIPTION_IMG,
  DESCRIPTION_TIME,
  SELECTION_LINEAR,
  SELECTION_DROPDOWN,
  SELECTION_CHECKBOX,
  SELECTION_OPTION,
  GRID_RADIO,
  GRID_CHECKBOX,
} from '../../typings/makeForm';
import { v4 as uuid } from 'uuid';

export const questionTypes = atom({
  key: 'questionTypes',
  default: {
    Description: [DESCRIPTION_SHORT, DESCRIPTION_LONG, DESCRIPTION_DATE, DESCRIPTION_TIME, DESCRIPTION_IMG],
    Selection: [SELECTION_OPTION, SELECTION_CHECKBOX, SELECTION_DROPDOWN, SELECTION_LINEAR],
    Grid: [GRID_RADIO, GRID_CHECKBOX],
  },
});

export const nowQuestion = atom<{ [key in string]: number }>({
  key: 'nowQuestion',
  default: { row: 0, col: 0 },
});

export const formInfo = atom<FormInfo>({ key: 'formInfo', default: { title: '', description: '' } });

export const questions = atom<Array<DescriptionQue | SelectionQue | GridQue>[]>({
  key: 'questions',
  default: [
    [
      {
        type: DESCRIPTION_SHORT,
        id: uuid(),
        required: true,
        title: 'What is your name?',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
      {
        type: SELECTION_CHECKBOX,
        id: uuid(),
        required: false,
        title: 'What is your age?',
        options: [{ content: '18' }, { content: '19' }, { content: '20' }],
        sectionNum: 0,
      },
    ],
  ],
});

export const sectionLens = atom<number[]>({ key: 'sectionLens', default: [] });
