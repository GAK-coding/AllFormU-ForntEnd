import { useGoogleLogin } from '@react-oauth/google';
import Button from '../../ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { LoginBtnBox } from '../../../pages/SignUp/styles';
import { useNavigate } from 'react-router-dom';
import { googleUserInfo } from '../../../recoil/User/atom';

const GoogleButton = () => {
  const { blue } = useRecoilValue(color);
  const navigate = useNavigate();
  const [info, setInfo] = useRecoilState(googleUserInfo);

  const loginSuccess = (res: any) => {
    const { access_token } = res;
    // console.log(res);
    navigate('/');

    fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { email, name } = data;
        // console.log('User Email:', email);
        // console.log('User Name:', name);

        setInfo({ nickname: name, email: email });

        // info를 api요청으로 보내기
      });
    // .catch((error) => console.log(error));
  };

  const loginButtonOnclick = useGoogleLogin({
    // scope: 'email profile',
    onSuccess: (res) => {
      loginSuccess(res);
    },
    // onError: (error) => console.log(error),
    // flow: 'auth-code',
  });
  return (
    <LoginBtnBox>
      <Button onClick={() => loginButtonOnclick()} color={'black'} bgColor={blue} fontSize={1.5} width={15} height={4}>
        <img src="/images/google.png" alt="google" />
        구글 로그인
      </Button>
    </LoginBtnBox>
  );
};

export default GoogleButton;
