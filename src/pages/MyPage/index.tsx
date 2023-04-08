import { useRecoilValue } from 'recoil';
import BaseBgBox from '../../components/ui/BaseBgBox';
import Button from '../../components/ui/Button';
import { color } from '../../recoil/Color/atom';

import { Form, FormWrapper, MyPageWrapper, UserInfo } from './styles';
import { useEffect, useState } from 'react';
import { signUpInfo } from '../../typings/user';

export default function MyPage() {
  //색깔
  const { subBlue } = useRecoilValue(color);

  interface MypageInfo extends signUpInfo {
    userImg?: string;
  }
  // user 개인 정보
  const [userInfo, setUserInfo] = useState<MypageInfo>({
    name: '',
    email: '',
    password: '',
    userImg: '',
  });

  // userInfo 값이 바뀔 때 마다 render
  useEffect(() => {
    const temp = { ...userInfo };
    setUserInfo(temp);
  }, [userInfo.name, userInfo.email, userInfo.userImg]);

  // 화면에 보여지는 값
  const { name, email, userImg } = userInfo;

  return (
    <BaseBgBox>
      <MyPageWrapper>
        {/* 상단 박스로 묶음 */}
        <div>
          My Page
          <Button color={'black'} bgColor={subBlue} fontSize={1.3} width={11} height={3}>
            프로필 수정
          </Button>
        </div>
        {/* 하단 박스로 묶음 */}
        <div>
          <UserInfo>
            {/* TODO : Img url 형태로 수정 */}
            <img src="userProfile.png" alt="userProfile" />
            <div>
              <span> 이름 : {name} </span>
              <span> email : {email} </span>
            </div>
          </UserInfo>
          {/* FormWrapper 하단 박스에 같이 묶음 */}
          <FormWrapper>
            <Form>form 1</Form>
            <Form>form 2</Form>
          </FormWrapper>
        </div>
      </MyPageWrapper>
    </BaseBgBox>
  );
}
