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
  try {
    const response = await axios.post('/member/check/duplicatedMember', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const emailCheckNum = async (data: sendEmail) => {
  try {
    const response = await axios.post('/member/register/confirm', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const signIn = async (data: signInInfo) => {
  try {
    const response = await axios.post('/member', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // 예외 처리를 위해 에러를 다시 throw합니다.
  }
};
