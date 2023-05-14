import axios from 'axios';
import { sendEmail, signInInfo, signUpInfo } from '../typings/user';

export const signUp = async (data: signUpInfo) =>
  await axios
    .post('/member/register', data)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });

export const checkEmail = async (data: sendEmail) => {
  await axios
    .post(`/member/check/duplicatedMember`, data)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const signIn = async (data: signInInfo) =>
  await axios
    .post('/member', data)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
