import React, { useState } from 'react';
import ResFormModal from '../../components/ResForm/ResFormModal';
import {
  ChatbotFunc,
  ChatbotResWrapper,
  Chatting,
  ChattingBottom,
  UserRes,
  Line,
  BtnBox,
  BtnBoxWrapper,
  List,
} from './styles';
import Button from '../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import ChatBox from './ChatBox';

export default function ResForm() {
  const { subBlue } = useRecoilValue(color);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const user = 'hihihihihihihi';
  const chat = 'byebyebyebyebyebyebyebyebyebyebyebye';
  return (
    <ChatbotResWrapper>
      <Chatting>
        <ChatBox user={user} chatbot={chat}></ChatBox>
        <ChatBox user={user} chatbot={chat}></ChatBox>
        <ChatBox user={user} chatbot={chat}></ChatBox>
        <ChatBox user={user} chatbot={chat}></ChatBox>
      </Chatting>
      <ChattingBottom>
        <ChatbotFunc>
          <Line>
            챗봇기능
            <br />
            사용하기
          </Line>
          <BtnBoxWrapper>
            <BtnBox>
              <Button color={'black'} bgColor={subBlue} fontSize={1} width={9.5} height={3}>
                질문 읽어주기
              </Button>
              <Button onClick={showModal} color={'black'} bgColor={subBlue} fontSize={1} width={9.5} height={3}>
                질문 세부설명
                {isModalOpen && <ResFormModal open={isModalOpen} onCancel={handleCancel} />}
              </Button>
            </BtnBox>
            <BtnBox>
              <Button color={'black'} bgColor={subBlue} fontSize={1} width={9.5} height={3}>
                기타문의
              </Button>
            </BtnBox>
          </BtnBoxWrapper>
        </ChatbotFunc>

        <UserRes>
          {/* <List> */}
          {/*   <img src="button.png" alt="button" /> */}
          {/* </List> */}
          <span>ㅠㅠㅠ</span>
        </UserRes>
      </ChattingBottom>
    </ChatbotResWrapper>
  );
}
