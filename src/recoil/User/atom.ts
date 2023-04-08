import { atom } from 'recoil';
import { user } from '../../typings/user';

export const userInfo = atom<user>({ key: 'userInfo', default: { id: -1, name: '', email: '' } });
