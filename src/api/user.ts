import axios from 'axios';
import { signUpInfo } from '../typings/user';

export const signUp = (data: signUpInfo) => axios.post('/api/signup', data);

// export const signIn = (data: signInInfo) => axios.post('/api/login', data);
export const signIn = (data: { email: string }) => axios.post('/api/login', data);
