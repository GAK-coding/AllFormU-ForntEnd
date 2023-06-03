import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
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
  EndInput,
} from '../styles';
import { BallonWrapper, ChatBallon, ChatbotWrapper, GAK } from '../../../components/Chatbot/BallonChat/styles';
import Ballon from '../../../components/Chatbot/BallonChat';
import Button from '../../../components/ui/Button';
import { color } from '../../../recoil/Color/atom';
import GPTSocket from '../../../components/GPT/GPTSocket';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { gptOpen } from '../../../recoil/Gpt/atom';
import { directChatMessage } from './DirectChatMessage';
import Input from '../../../components/ui/Input';
import { detailChat, initialChat } from '../../../recoil/Chatbot/atom';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../hooks/useMessage';
import { questions } from '../../../recoil/MakeForm/atom';
import { DESCRIPTION_SHORT } from '../../../typings/makeForm';
import { v4 as uuid } from 'uuid';

export default function MakeFormChatbot() {
  const { blue } = useRecoilValue(color);
  const { showMessage, contextHolder } = useMessage();
  const [isOpen, setIsOpen] = useRecoilState(gptOpen);
  const [checking, setChecking] = useState<boolean>(false);

  const setQuestionList = useSetRecoilState(questions);
  const [userInput, setUserInput] = useState<string>('');
  const [sendInitMessage, setSendInitMessage] = useRecoilState(initialChat);
  const [sendDetailMessage, setSendDetailMessage] = useRecoilState(detailChat);
  const [currentInitialIndex, setCurrentInitialIndex] = useState(0);
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);
  const [repeatCount, setRepeatCount] = useState<number>(1);
  const { initMessage, detailMessage } = directChatMessage({ repeat: repeatCount });

  const sectionNumRange = ['1', '2', '3', '4', '5'];
  const queNumRange = Array.from({ length: 100 }, (_, index) => (index + 1).toString());

  const navigate = useNavigate();

  const showModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const showPreview = useCallback(() => {
    navigate('/makeform/direct', { state: { isChatbot: true } });
    setQuestionList([
      [
        {
          type: DESCRIPTION_SHORT,
          tempId: uuid(),
          required: false,
          title: '',
          sectionNum: 0,
          descriptions: [{ content: '' }],
        },
      ],
    ]);
  }, []);

  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (currentInitialIndex <= 2) {
        if (currentInitialIndex === 2) {
          const includeRange = sectionNumRange.some((path) => userInput.slice(0, 1).includes(path));

          if (!includeRange) {
            showMessage('warning', '1 ~ 5 사이의 숫자를 입력해주세요');
            return;
          }
          setChecking(true);
          setRepeatCount(+userInput.slice(0, 1));
        }
        setSendInitMessage((prev) => [...prev, { message: userInput }]);
        setCurrentInitialIndex(currentInitialIndex + 1);
      } else {
        if (currentDetailIndex > 0) {
          if (currentDetailIndex % 2 !== 0) {
            const includeRange = queNumRange.some((path) => userInput.slice(0, 1).includes(path));
            if (!includeRange) {
              showMessage('warning', '1 ~ 100 사이의 숫자를 입력해주세요');
              return;
            }
          }
        }
        setSendDetailMessage((prev) => [...prev, { message: userInput }]);
        setCurrentDetailIndex(currentDetailIndex + 1);
      }

      setUserInput('');
    },
    [
      currentInitialIndex,
      currentDetailIndex,
      setUserInput,
      userInput,
      sendInitMessage,
      setSendDetailMessage,
      setSendInitMessage,
      checking,
    ]
  );

  const talkRef = useRef<HTMLDivElement>(null); // Ref 생성
  useEffect(() => {
    talkRef.current?.scrollTo(0, talkRef.current.scrollHeight); // Ref를 사용하여 스크롤 내리기
  }, [initMessage, detailMessage, userInput]); // talk 상태가 변경될 때마다 실행

  return (
    <BaseBgBox>
      {contextHolder}
      <Wrapper>
        <ViewWrapper ref={talkRef}>
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

          {initMessage.map((initMessage, idx) => {
            if (idx < currentInitialIndex) {
              return <Ballon key={idx} user={sendInitMessage[idx].message} chatbot={initMessage.message} />;
            } else if (idx === currentInitialIndex) {
              return <Ballon key={idx} user={''} chatbot={initMessage.message} />;
            }
          })}

          {/* {checking && */}
          {/*   [...Array(repeatCount)].map((v, index) => { */}
          {/*     return detailMessage.map((detailMessage, idx) => { */}
          {/*       if (idx + index * 2 < currentDetailIndex) { */}
          {/*         return ( */}
          {/*           <Ballon */}
          {/*             key={idx + index * 2} */}
          {/*             user={sendDetailMessage[idx + index * 2].message} */}
          {/*             chatbot={detailMessage.message} */}
          {/*           /> */}
          {/*         ); */}
          {/*       } else if (idx + index * 2 === currentDetailIndex) { */}
          {/*         return <Ballon key={idx + index * 2} user={''} chatbot={detailMessage.message} />; */}
          {/*       } */}
          {/*     }); */}
          {/*   })} */}

          {checking &&
            detailMessage.map((detailMessage, idx) => {
              if (idx < currentDetailIndex) {
                return <Ballon key={idx} user={sendDetailMessage[idx].message} chatbot={detailMessage.message} />;
              } else if (idx === currentDetailIndex) {
                return <Ballon key={idx} user={''} chatbot={detailMessage.message} />;
              }
            })}

          {currentDetailIndex >= 2 * repeatCount && (
            <ChatbotWrapper>
              <BallonWrapper>
                <GAK>
                  <img src="/images/gak_chatbot.png" alt="gak" />
                  <span>GAK</span>
                </GAK>
                <ChatBallon>
                  <span>
                    기본 설정이 모두 완료 되었습니다! <br />
                    상세 내용은 직접설정에서 설정해주세요 😊
                  </span>
                </ChatBallon>
              </BallonWrapper>
            </ChatbotWrapper>
          )}
        </ViewWrapper>
        <InPutWrapper>
          <FunctionWrapper>
            <FunctionTitle>
              <span>부가 기능 사용하기</span>
            </FunctionTitle>
            <FunctionContent>
              <Button onClick={showPreview} color={'#2d2d2d'} bgColor={blue} fontSize={1.2} width={11} height={3.5}>
                폼 미리보기
              </Button>
              <Button onClick={showModal} color={'#2d2d2d'} bgColor={blue} fontSize={1.2} width={11} height={3.5}>
                GPT 이용하기
              </Button>
            </FunctionContent>
          </FunctionWrapper>

          {isOpen && <GPTSocket />}
          <UserResWrapper>
            <UserInput onSubmit={onSubmit}>
              {currentDetailIndex < 2 * repeatCount ? (
                <>
                  <Input
                    type={'text'}
                    value={userInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
                    placeholder={'챗봇에게 메시지를 입력하세요.'}
                    width={'100%'}
                    size={1.3}
                  ></Input>

                  <SubmitBtn>
                    <Button type={'submit'} color={'#2d2d2d'} bgColor={blue} fontSize={1.3} width={8} height={4}>
                      전송
                    </Button>
                  </SubmitBtn>
                </>
              ) : (
                <>
                  <EndInput />
                  <SubmitBtn>
                    <Button color={'#2d2d2d'} bgColor={blue} fontSize={1.3} width={8} height={4}>
                      전송
                    </Button>
                  </SubmitBtn>
                </>
              )}
            </UserInput>
          </UserResWrapper>
        </InPutWrapper>
      </Wrapper>
    </BaseBgBox>
  );
}
