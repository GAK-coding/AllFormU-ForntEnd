import axios from 'axios';
import { SignUpInfo } from '../typings/user';

const backendPortNumber = '8080';
const serverUrl = 'http://' + window.location.hostname + ':' + backendPortNumber + '/';

export const signUp = (data: SignUpInfo) => axios.post(`${serverUrl}/api/signup`, data);
