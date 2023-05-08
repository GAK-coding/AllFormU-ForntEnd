import axios from 'axios';
import { signInInfo, signUpInfo } from '../typings/user';

export const signUp = async (data: signUpInfo) =>
  await axios
    .post('/member/register', data)
    .then((res) => {
      alert('회원가입 성공');
      console.log(res);
    })
    .catch((err) => {
      alert('회원가입 실패');
      console.error(err);
    });

export const signIn = async (data: signInInfo) =>
  await axios
    .get('/member', { params: data })
    .then((res) => {
      alert('로그인 성공');
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      alert('로그인 실패');
      console.error(err);
    });
