import { ChangeEvent, useCallback } from 'react';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import {
  FunctionContent,
  FunctionTitle,
  FunctionWrapper,
  InPutWrapper,
  UserResWrapper,
  ViewWrapper,
  Wrapper,
  UserInput,
  SubmitBtn,
} from '../styles';
import { BallonWrapper, ChatBallon, ChatbotWrapper, GAK } from '../../../components/Chatbot/BallonChat/styles';
import Ballon from '../../../components/Chatbot/BallonChat';
import Button from '../../../components/ui/Button';
import { color } from '../../../recoil/Color/atom';
import GPTSocket from '../../../components/GPT/GPTSocket';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gptOpen } from '../../../recoil/Gpt/atom';
import { directChatMessage } from './DirectChatMessage';
import Input from '../../../components/ui/Input';
import { UserChat } from '../../../typings/chatbot';
import { userChat } from '../../../recoil/Chatbot/atom';

export default function MakeFormChatbot() {
  const { blue } = useRecoilValue(color);
  const [isOpen, setIsOpen] = useRecoilState(gptOpen);

  const showModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const { initMessage, detailMessage } = directChatMessage();
  const [userInput, setUserInput] = useRecoilState(userChat);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof UserChat) => {
      const temp = { ...userInput };
      temp[value] = e.target.value;

      setUserInput(temp);
    },
    [userInput]
  );

  return (
    <BaseBgBox>
      <Wrapper>
        <ViewWrapper>
          <ChatbotWrapper>
            <BallonWrapper>
              <GAK>
                <img src="/images/gak_chatbot.png" alt="gak" />
                <span>GAK</span>
              </GAK>
              <ChatBallon>
                <span>안녕하세요, All Form U 챗봇 설문 생성 서비스입니다 ☺️</span>
              </ChatBallon>
            </BallonWrapper>
          </ChatbotWrapper>

          {initMessage.message.map((message, idx) => {
            return <Ballon key={idx} user={''} chatbot={message} />;
          })}
        </ViewWrapper>
        <InPutWrapper>
          <FunctionWrapper>
            <FunctionTitle>
              <span>부가 기능 사용하기</span>
            </FunctionTitle>
            <FunctionContent>
              <Button color={'#2d2d2d'} bgColor={blue} fontSize={1.2} width={11} height={3.5}>
                폼 미리보기
              </Button>
              <Button onClick={showModal} color={'#2d2d2d'} bgColor={blue} fontSize={1.2} width={11} height={3.5}>
                GPT 이용하기
              </Button>
            </FunctionContent>
          </FunctionWrapper>

          {isOpen && <GPTSocket />}
          <UserResWrapper>
            <UserInput>
              <Input
                type={'text'}
                value={userInput.message}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'message')}
                placeholder={''}
                width={'100%'}
                height={'70%'}
                size={1.3}
              ></Input>
            </UserInput>
            <SubmitBtn>
              <Button color={'#2d2d2d'} bgColor={blue} fontSize={1.2} width={7} height={3}>
                전송
              </Button>
            </SubmitBtn>
          </UserResWrapper>
        </InPutWrapper>
      </Wrapper>
    </BaseBgBox>
  );
}
