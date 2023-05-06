import { atom } from 'recoil';
import { myPageInfo, signUpInfo, user } from '../../typings/user';

export const userInfo = atom<user>({ key: 'userInfo', default: { id: -1, name: '', email: '' } });

export const signUpUserInfo = atom<signUpInfo>({
  key: 'signUpUserInfo',
  default: { name: '', email: '', password: '' },
});

export const mypageInfo = atom<myPageInfo>({
  key: 'mypageInfo',
  default: { id: -1, email: '', name: '', userImg: '' },
});
