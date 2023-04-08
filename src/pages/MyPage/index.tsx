import { useRecoilValue } from 'recoil';
import BaseBgBox from '../../components/ui/BaseBgBox';
import Button from '../../components/ui/Button';
import { color } from '../../recoil/Color/atom';

import { MyPageWrapper, UserInfo } from './styles';
import { useEffect, useState } from 'react';
import { SignUpInfo } from '../../typings/user';

export default function MyPage() {
  //색깔
  const { subBlue } = useRecoilValue(color);

  // user 개인 정보
  const [userInfo, setUserInfo] = useState<SignUpInfo>({
    name: '',
    email: '',
    password: '',
  });

  // userInfo 값이 바뀔 때 마다 render
  useEffect(() => {
    const temp = { ...userInfo };
    setUserInfo(temp);
  }, [userInfo.name, userInfo.email]);

  // 화면에 보여지는 값
  const { name, email } = userInfo;

  return (
    <BaseBgBox>
      <MyPageWrapper>
        <div>
          My Page
          <Button color={'black'} bgColor={subBlue} fontSize={1.3} width={11} height={3}>
            프로필 수정
          </Button>
        </div>
        <UserInfo>
          <img src="userProfile.png" alt="userProfile" />
          <div>
            <span> 이름 : {name} </span>
            <span> email : {email} </span>
          </div>
        </UserInfo>
      </MyPageWrapper>
    </BaseBgBox>
  );
}
