import { atom } from 'recoil';
import { makeInfoList } from '../../typings/makeForm';
import { resInfoList } from '../../typings/resForm';

export const makeFormInfoList = atom<makeInfoList[]>({
  key: 'makeformInfoList',
  default: [],
});

export const resFormInfoList = atom<resInfoList[]>({
  key: 'resFormInfoList',
  default: [],
});
