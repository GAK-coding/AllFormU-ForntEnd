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

// export const DESCRIPTION_SHORT = 'Description_SHORT';
// export const DESCRIPTION_LONG = 'Description_LONG';
// export const DESCRIPTION_DATE = 'Description_DATE';
// export const DESCRIPTION_TIME = 'Description_TIME';
// export const DESCRIPTION_IMG = 'Description_IMG';
// export const SELECTION_OPTION = 'Selection_OPTION';
// export const SELECTION_CHECKBOX = 'Selection_CHECKBOX';
// export const SELECTION_DROPDOWN = 'Selection_DROPDOWN';
// export const SELECTION_LINEAR = 'Selection_LINEAR';
// export const GRID_RADIO = 'Grid_RADIO';
// export const GRID_CHECKBOX = 'Grid_CHECKBOX';

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
        require: true,
        title: 'What is your name?',
        section: 0,
      },
      {
        type: SELECTION_CHECKBOX,
        id: uuid(),
        require: false,
        title: 'What is your age?',
        options: ['18', '19', '20'],
        section: 0,
      },
    ],
    [
      {
        type: SELECTION_CHECKBOX,
        id: uuid(),
        require: false,
        title: '',
        options: [''],
        section: 1,
      },
      {
        type: SELECTION_CHECKBOX,
        id: uuid(),
        require: false,
        title: '',
        options: [''],
        section: 1,
      },
    ],
    [
      {
        type: SELECTION_CHECKBOX,
        id: uuid(),
        require: false,
        title: '123',
        options: [''],
        section: 2,
      },
      {
        type: SELECTION_CHECKBOX,
        id: uuid(),
        require: false,
        title: '',
        options: [''],
        section: 2,
      },
    ],
  ],
});

export const sectionLens = atom<number[]>({ key: 'sectionLens', default: [] });
