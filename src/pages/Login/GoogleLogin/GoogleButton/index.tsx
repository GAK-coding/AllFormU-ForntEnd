import { useGoogleLogin } from '@react-oauth/google';
import Button from '../../../../components/ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../../../recoil/Color/atom';
import { LoginBtnBox } from '../../../SignUp/styles';
import { useNavigate } from 'react-router-dom';
import { googleUserInfo } from '../../../../recoil/User/atom';

const GoogleButton = () => {
  const { blue } = useRecoilValue(color);
  const navigate = useNavigate();
  const [info, setInfo] = useRecoilState(googleUserInfo);

  const loginButtonOnclick = useGoogleLogin({
    // scope: 'email profile',
    onSuccess: (res) => {
      const { access_token } = res;
      console.log(res);
      navigate('/');

      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const { email, name } = data;
          console.log('User Email:', email);
          console.log('User Name:', name);
          console.log(access_token);
          setInfo({ nickname: name, email: email });
          console.log(info);
        })
        .catch((error) => console.log(error));
    },
    onError: (error) => console.log(error),
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
