import { atom } from 'recoil';
import { Chatbot, ResDescription, ResSelection } from '../../typings/resForm';

export const chatTalks = atom<Chatbot[]>({ key: 'chatTalks', default: [{ user: '', chatbot: '' }] });

export const resSets = atom<(ResDescription | ResSelection)[]>({ key: 'resSets', default: [] });

export const checkRequired = atom<number[]>({ key: 'checkRequired', default: [] });
