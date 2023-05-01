import { atom } from 'recoil';
import { FormInfo, ShortQue } from '../../typings/makeForm';
import { v4 as uuid } from 'uuid';

export const formInfo = atom<FormInfo>({ key: 'formInfo', default: { title: '', description: '' } });

export const questions = atom<ShortQue[]>({
  key: 'questions',
  default: [
    {
      type: 'short',
      id: uuid(),
      require: false,
      title: '',
      answer: '',
    },
    {
      type: 'short',
      id: uuid(),
      require: false,
      title: '',
      answer: '',
    },
    {
      type: 'short',
      id: uuid(),
      require: false,
      title: '',
      answer: '',
    },
    // {
    //   type: 'short',
    //   require: false,
    //   title: '',
    //   answer: '',
    // },
    // {
    //   type: 'short',
    //   require: false,
    //   title: '',
    //   answer: '',
    // },
    // {
    //   type: 'short',
    //   require: false,
    //   title: '',
    //   answer: '',
    // },
    // {
    //   type: 'short',
    //   require: false,
    //   title: '',
    //   answer: '',
    // },
    // {
    //   type: 'short',
    //   require: false,
    //   title: '',
    //   answer: '',
    // },
    // {
    //   type: 'short',
    //   require: false,
    //   title: '',
    //   answer: '',
    // },
    // {
    //   type: 'short',
    //   require: false,
    //   title: '',
    //   answer: '',
    // },
  ],
});
