import { atom } from 'recoil';
import { FormInfo, ShortQue } from '../../typings/makeForm';

export const formInfo = atom<FormInfo>({ key: 'formInfo', default: { title: '', description: '' } });

export const questions = atom<ShortQue[]>({
  key: 'questions',
  default: [
    {
      type: 'short',
      require: true,
      title: '테스트 질문1?',
      answer: '테스트 대답1',
    },
    {
      type: 'short',
      require: false,
      title: '테스트 질문2?',
      answer: '테스트 대답2',
    },
    {
      type: 'short',
      require: true,
      title: '테스트 질문3?',
      answer: '테스트 대답3',
    },
  ],
});
