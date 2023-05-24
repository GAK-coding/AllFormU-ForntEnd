import { atom } from 'recoil';
import { UserChat } from '../../typings/chatbot';

export const userChat = atom<UserChat>({ key: 'userChat', default: { message: '' } });
