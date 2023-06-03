import React from 'react';
import { ChatBox } from './styles';
import { Skeleton } from 'antd';
import { Chat } from '../../../typings/resForm';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../recoil/User/atom';

export default function GPTModalChat({ myReq, gptRes }: Chat) {
  const info = useRecoilValue(userInfo);
  return (
    <div>
      <ChatBox type={'user'}>
        <div>
          <img src={info.image} alt={'유저 프로필 사진'} />
          <span>{info.nickname}</span>
        </div>
        <span>{myReq}</span>
      </ChatBox>
      <ChatBox type={'gpt'}>
        <div>
          <img src={'/images/chatgpt.png'} alt={'chat gpt 사진'} />
          <span>GPT</span>
        </div>
        <span>{gptRes ? gptRes : <Skeleton loading={true} active />}</span>
      </ChatBox>
    </div>
  );
}
