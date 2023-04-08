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

  interface MypageInfo extends SignUpInfo {
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
        <div>
          My Page
          <Button color={'black'} bgColor={subBlue} fontSize={1.3} width={11} height={3}>
            프로필 수정
          </Button>
        </div>
        <UserInfo>
          {/* TODO : Img url 형태로 수정 */}
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
