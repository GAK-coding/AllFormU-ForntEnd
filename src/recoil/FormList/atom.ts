import { atom } from 'recoil';
import { MakeInfoList } from '../../typings/makeForm';
import { resInfoList } from '../../typings/resForm';

export const makeFormInfoList = atom<MakeInfoList[]>({
  key: 'makeformInfoList',
  default: [],
});

export const resFormInfoList = atom<resInfoList[]>({
  key: 'resFormInfoList',
  default: [],
});
