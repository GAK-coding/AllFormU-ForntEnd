import { atom } from 'recoil';
import { Chatbot } from '../../typings/resForm';

export const chatTalks = atom<Chatbot[]>({ key: 'chatTalks', default: [{ user: ' 안녕', chatbot: '싫어' }] });
