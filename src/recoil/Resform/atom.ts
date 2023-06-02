import { atom } from 'recoil';
import { Chatbot, ResDescription, ResSelection } from '../../typings/resForm';

export const chatTalks = atom<Chatbot[]>({ key: 'chatTalks', default: [{ user: '', chatbot: '' }] });

export const resDescriptionSets = atom<ResDescription[]>({ key: 'resDescriptionSets', default: [] });

export const resSelectionSets = atom<(ResSelection | '')[]>({ key: 'resSelectionSets', default: [] });

export const checkRequired = atom<number[]>({ key: 'checkRequired', default: [] });
