import { atom } from 'recoil';
import { FormInfo, DescriptionQue, SelectionQue, GridQue } from '../../typings/makeForm';
import { v4 as uuid } from 'uuid';

export const questionTypes = atom({
  key: 'questionTypes',
  default: {
    Description: ['Description_short', 'Description_long', 'Description_date', 'Description_time', 'Description_image'],
    Selection: ['Selection_selection', 'Selection_checkBox', 'Selection_dropDown', 'Selection_linear'],
    Grid: ['Grid_radio', 'Grid_checkBox'],
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
        type: 'Description_short',
        id: uuid(),
        require: true,
        title: 'What is your name?',
        section: 0,
      },
      {
        type: 'Selection_checkBox',
        id: uuid(),
        require: false,
        title: 'What is your age?',
        options: ['18', '19', '20'],
        section: 0,
      },
    ],
    [
      {
        type: 'Selection_checkBox',
        id: uuid(),
        require: false,
        title: '',
        options: [''],
        section: 1,
      },
      {
        type: 'Selection_checkBox',
        id: uuid(),
        require: false,
        title: '',
        options: [''],
        section: 1,
      },
    ],
  ],
});

export const sectionLens = atom<number[]>({ key: 'sectionLens', default: [] });
