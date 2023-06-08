import axios from 'axios';
import { newInfo, sendEmail, signInInfo, signUpInfo } from '../typings/user';

const token = localStorage.getItem('accessToken');

// 이메일 중복 확인
export const checkEmail = async (data: sendEmail) => {
  try {
    const response = await axios.post('/member/check/duplicatedMember', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    true;

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
    // console.error(error);
    true;
    throw error;
  }
};

// 회원가입
export const signUp = async (data: signUpInfo) => {
  try {
    const response = await axios.post('/member/register', data);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    true;
    throw error;
  }
};

// 로그인
export const signIn = async (data: signInInfo) => {
  try {
    const response = await axios.post('/member/login', data);
    return response.data;
  } catch (error) {
    true;
    // console.error(error);
    throw error;
  }
};

// nickname 변경
export const changeNickname = async (data: newInfo) => {
  try {
    const response = await axios.patch('/member/update/nickname', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    true;
    throw error;
  }
};

// 비밀번호 변경
export const changePwd = async (data: newInfo) => {
  try {
    const response = await axios.patch('/member/update/password', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    true;
    throw error;
  }
};

// 사진 url 변경
export const changeUrl = async (data: { image: File }) => {
  try {
    const formData = new FormData();
    formData.append('file', data.image);

    const url = await axios.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
    });

    return url.data;
  } catch (error) {
    // console.error(error);
    true;
    throw error;
  }
};

// 사진 변경
export const changeImg = async (data: { id: number; newImage: string }) => {
  try {
    const response = await axios.patch(
      '/member/update/image',
      { id: data.id, newImage: data.newImage },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    true;
    throw error;
  }
};

// 휴면계정 변환
export const setDormant = async (id: number) => {
  try {
    const response = await axios.patch(`/member/dormant/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    true;
    throw error;
  }
};

// 계정탈퇴
export const setWithdrawal = async (id: number) => {
  try {
    const response = await axios.patch(`/member/withdrawal/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    true;
    throw error;
  }
};
