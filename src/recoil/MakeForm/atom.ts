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

export const formInfo = atom<FormInfo>({ key: 'formInfo', default: { title: '', description: '' } });

export const questions = atom<Array<DescriptionQue | SelectionQue | GridQue>>({
  key: 'questions',
  default: [
    {
      type: 'Description_time',
      id: uuid(),
      require: false,
      title: '',
    },
    {
      type: 'Selection_selection',
      id: uuid(),
      require: false,
      title: '',
      options: ['0', '10'],
    },
    {
      type: 'Grid_radio',
      id: uuid(),
      require: false,
      title: '',
      rows: [''],
      cols: [''],
    },
  ],
});
