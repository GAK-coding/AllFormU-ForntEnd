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
  SectionType,
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

export const formInfo = atom<FormInfo>({ key: 'formInfo', default: { title: '', content: '' } });

export const questions = atom<Array<DescriptionQue | SelectionQue | GridQue>[]>({
  key: 'questions',
  default: [
    [
      {
        type: DESCRIPTION_SHORT,
        id: uuid(),
        required: false,
        title: '',
        sectionNum: 0,
        descriptions: [{ content: '' }],
      },
    ],
  ],
});

export const sectionNames = atom<string[]>({ key: 'sectionNames', default: [''] });

export const sectionLens = atom<number[]>({ key: 'sectionLens', default: [] });

export const changeSection = atom<boolean>({ key: 'changeSection', default: false });

export const queSectionNum = atom<SectionType[]>({ key: 'queSectionNum', default: [{ value: '0', label: '1' }] });
