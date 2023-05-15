import axios from 'axios';
import { sendEmail, signInInfo, signUpInfo } from '../typings/user';

// 이메일 중복 확인
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

// 이메일 인증번호 전송
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

// 회원가입
export const signUp = async (data: signUpInfo) => {
  try {
    const response = await axios.post('/member/register', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 로그인
export const signIn = async (data: signInInfo) => {
  try {
    const response = await axios.post('/member', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 휴면계정 변환
export const setDormant = async (id: number) => {
  try {
    const response = await axios.patch(`/member/dormant/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 계정탈퇴
export const setWithdrawal = async (id: number) => {
  try {
    const response = await axios.patch(`/member/withdrawal/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
