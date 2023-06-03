import { atom } from 'recoil';
import { Chatbot, ResDescription, ResSelection, ResSelections } from '../../typings/resForm';

export const chatTalks = atom<Chatbot[]>({ key: 'chatTalks', default: [{ user: '', chatbot: '' }] });

export const resDescriptionSets = atom<ResDescription[]>({ key: 'resDescriptionSets', default: [] });

export const resSelectionSets = atom<ResSelections>({ key: 'resSelectionSets', default: {} });

export const checkRequired = atom<number[]>({ key: 'checkRequired', default: [] });
