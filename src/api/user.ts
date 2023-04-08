import axios from 'axios';
import { SignUpInfo } from '../typings/user';

export const signUp = (data: SignUpInfo) => axios.post('/api/signup', data);
