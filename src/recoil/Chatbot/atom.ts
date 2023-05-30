import { atom } from 'recoil';
import { UserChat } from '../../typings/chatbot';

export const initialChat = atom<UserChat[]>({ key: 'initialChat', default: [] });
export const detailChat = atom<UserChat[]>({ key: 'detailChat', default: [] });
