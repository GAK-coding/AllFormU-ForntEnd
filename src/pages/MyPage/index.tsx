import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import BaseBgBox from '../../components/ui/BaseBgBox';
import Button from '../../components/ui/Button';
import { color } from '../../recoil/Color/atom';
import { AlignBox, BtnBox, Form, FormBox, FormWrapper, Line, MyPageWrapper, UserInfo } from './styles';
import { userInfo } from '../../recoil/User/atom';
import { useNavigate, Route, Navigate, Routes } from 'react-router-dom';

export default function MyPage() {
  //색깔
  const { subBlue } = useRecoilValue(color);

  // user 개인 정보

  const [info, setInfo] = useRecoilState(userInfo);
  // 현재 user의 info
  const myInfo = useRecoilValue(userInfo);
  const setMyInfo = useSetRecoilState(userInfo);

  // 화면에 보여지는 값
  const { id, name, email } = info;

  // 폼 데이터를 받아오는 값 저장
  const formdata = 'hi';

  const navigate = useNavigate();

  // userInfo 값이 바뀔 때 마다 render
  // useEffect(() => {
  //   const temp = { ...myInfo };
  //   setInfo(temp);
  //   setMyInfo(temp);
  //   console.log(myInfo);
  // }, [info.name, info.email, info.userImg]);

  if (id === -1) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/signin" />} />;
      </Routes>
    );
  }

  return (
    <BaseBgBox>
      <MyPageWrapper>
        {/* TODO : My Page 글자 넣기 */}
        <UserInfo>
          {/* TODO : Img url 형태로 수정 */}
          <div>My Page</div>
          <img src="userProfile.png" alt="userProfile" />
          <div>
            <span> 이름 : {info.name} </span>
            <span> email : {info.email} </span>
          </div>
        </UserInfo>

        <FormWrapper>
          <BtnBox>
            <Button color={'black'} bgColor={subBlue} fontSize={1.3} width={11} height={3.5}>
              프로필 수정
            </Button>
          </BtnBox>
          <Form>
            <Line>내 생성폼</Line>
            <AlignBox>
              {formdata && <FormBox onClick={() => navigate('/')}>{formdata}</FormBox>}
              {formdata && <FormBox onClick={() => navigate('/')}>{formdata}</FormBox>}
            </AlignBox>
            <AlignBox>
              {formdata && <FormBox onClick={() => navigate('/')}>{formdata}</FormBox>}
              {formdata && <FormBox onClick={() => navigate('/')}>{formdata}</FormBox>}
            </AlignBox>
          </Form>
          <Form>
            <Line>내 응답</Line>
            <AlignBox>
              {formdata && <FormBox onClick={() => navigate('/')}>{formdata}</FormBox>}
              {formdata && <FormBox onClick={() => navigate('/')}>{formdata}</FormBox>}
            </AlignBox>
            <AlignBox>
              {formdata && <FormBox onClick={() => navigate('/')}>{formdata}</FormBox>}
              {formdata && <FormBox onClick={() => navigate('/')}>{formdata}</FormBox>}
            </AlignBox>
          </Form>
        </FormWrapper>
      </MyPageWrapper>
    </BaseBgBox>
  );
}
