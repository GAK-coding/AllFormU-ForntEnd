import { atom } from 'recoil';

export const color = atom({
  key: 'color',
  default: { purple: '#655DBB', lightPurple: '#E8D3FF', blue: '#C0DEFF' },
});
