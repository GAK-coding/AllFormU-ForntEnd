import { atom } from 'recoil';
import { googleUser, signInInfo, signUpInfo, user } from '../../typings/user';

export const userInfo = atom<user>({ key: 'userInfo', default: { id: -1, nickname: '', email: '', password: '' } });

export const googleUserInfo = atom<googleUser>({
  key: 'googleUserInfo',
  default: { nickname: '', email: '' },
});

export const signUpUserInfo = atom<signUpInfo>({
  key: 'signUpUserInfo',
  default: { nickname: '', email: '', password: '' },
});

export const signInUserInfo = atom<signInInfo>({
  key: 'signInUserInfo',
  default: { email: '', password: '' },
});
