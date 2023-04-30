import { atom } from 'recoil';
import { FormInfo } from '../../typings/makeForm';

export const formInfoList = atom<FormInfo[]>({
  key: 'formInfoList',
  default: [],
});
