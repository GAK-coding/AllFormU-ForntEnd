import { useRecoilValue } from 'recoil';
import { EditPageWrapper, InputWrapper, SetUserImage, BtnBox, StopUser } from './styles';
import { color } from '../../../recoil/Color/atom';
import Button from '../../../components/ui/Button';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import Input from '../../../components/ui/Input';
import { ChangeEvent, useCallback, useState } from 'react';
import { signInInfo } from '../../../typings/user';

export default function Edit() {
  const { blue, lightPurple } = useRecoilValue(color);
  const username = 'codud';

  const [info, setInfo] = useState<signInInfo>({
    email: '',
    password: '',
  });

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof signInInfo) => {
      const temp = { ...info };
      temp[value] = e.target.value;
      setInfo(temp);
    },
    [info]
  );

  return (
    <BaseBgBox>
      <EditPageWrapper>
        <SetUserImage>
          <div>프로필 수정</div>
          <img src="/images/userProfile.png" alt="userProfile" />
          <Button color={'black'} bgColor={blue} fontSize={1.3} width={11} height={3.5}>
            사진 업로드
          </Button>
          <Button color={'black'} bgColor={blue} fontSize={1.3} width={13} height={3.5}>
            변경사항 저장
          </Button>
        </SetUserImage>

        <InputWrapper>
          <BtnBox>
            <Button color={'black'} bgColor={blue} fontSize={1.3} width={9} height={3.5}>
              완료
            </Button>
          </BtnBox>

          <div>
            <span>이름</span>
            <Input
              type={'username'}
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
              placeholder={username}
              width={30}
              height={2}
              size={1.5}
            />
          </div>

          <div>
            <span>이메일</span>
            <Input
              type={'username'}
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
              placeholder={username}
              width={30}
              height={2}
              size={1.5}
            />

            <Button color={'black'} bgColor={blue} fontSize={1.2} width={9} height={3.5}>
              인증번호 전송
            </Button>
          </div>

          <div>
            <span>인증번호</span>
            <Input
              type={'username'}
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
              placeholder={username}
              width={30}
              height={2}
              size={1.5}
            />

            <Button color={'black'} bgColor={blue} fontSize={1.3} width={9} height={3.5}>
              확인
            </Button>
          </div>

          <div>
            <span>비밀번호</span>
            <Input
              type={'username'}
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
              placeholder={username}
              width={30}
              height={2}
              size={1.5}
            />
          </div>

          <div>
            <span>비밀번호 확인</span>
            <Input
              type={'username'}
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
              placeholder={username}
              width={30}
              height={2}
              size={1.5}
            />

            <Button color={'black'} bgColor={blue} fontSize={1.3} width={9} height={3.5}>
              확인
            </Button>
          </div>

          <StopUser>
            <Button color={'#696969'} bgColor={lightPurple} fontSize={1.3} width={12} height={3.5}>
              휴면계정 전환
            </Button>
            <Button color={'#696969'} bgColor={lightPurple} fontSize={1.3} width={12} height={3.5}>
              회원탈퇴
            </Button>
          </StopUser>
        </InputWrapper>
      </EditPageWrapper>
    </BaseBgBox>
  );
}
