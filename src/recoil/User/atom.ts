import { atom } from 'recoil';
import { user } from '../../typings/user';
import { recoilPersist } from 'recoil-persist';

export const userInfo = atom<user>({
  key: 'userInfo',
  default: { id: -1, nickname: '', email: '', password: '', image: '/images/userProfile.png' },
});

export const googleUserInfo = atom({
  key: 'googleUserInfo',
  default: { nickname: '', email: '' },
});

export const signUpUserInfo = atom({
  key: 'signUpUserInfo',
  default: { nickname: '', email: '', password: '', image: '/images/userProfile.png' },
});

export const signInUserInfo = atom({
  key: 'signInUserInfo',
  default: { email: '', password: '' },
});

const { persistAtom } = recoilPersist();

export const userPersist = atom({
  key: 'userPersist',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const isLogin = atom({ key: 'isLogin', default: !!localStorage.getItem('accessToken') });
