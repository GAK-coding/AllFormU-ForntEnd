import { atom } from 'recoil';
import { user } from '../../typings/user';

export const userInfo = atom<user>({ key: 'userInfo', default: { id: -1, nickname: '', email: '', password: '' } });

export const googleUserInfo = atom({
  key: 'googleUserInfo',
  default: { nickname: '', email: '' },
});

export const signUpUserInfo = atom({
  key: 'signUpUserInfo',
  default: { nickname: '', email: '', password: '' },
});

export const signInUserInfo = atom({
  key: 'signInUserInfo',
  default: { email: '', password: '' },
});

export const isLogin = atom({ key: 'isLogin', default: !!localStorage.getItem('accessToken') });
