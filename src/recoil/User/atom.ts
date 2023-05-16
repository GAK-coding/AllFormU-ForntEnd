import { atom } from 'recoil';
import { signInInfo, signUpInfo, user } from '../../typings/user';

export const userInfo = atom<user>({ key: 'userInfo', default: { id: -1, nickname: '', email: '', password: '' } });

export const signUpUserInfo = atom<signUpInfo>({
  key: 'signUpUserInfo',
  default: { nickname: '', email: '', password: '' },
});

export const signInUserInfo = atom<signInInfo>({
  key: 'signInUserInfo',
  default: { email: '', password: '' },
});
