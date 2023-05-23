import { atom } from 'recoil';
import { Chat } from '../../typings/resForm';

export const gptTalks = atom<Chat[]>({ key: 'gptTalks', default: [] });

export const gptLoading = atom({ key: 'gptLoading', default: false });

export const gptOpen = atom({ key: 'openModal', default: false });
