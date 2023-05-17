import { useGoogleLogin } from '@react-oauth/google';
import Button from '../../ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { BtnBox, LoginBtnBox } from '../../../pages/SignUp/styles';
import axios from 'axios';

const GoogleButton = () => {
  const { blue } = useRecoilValue(color);

  const loginButtonOnclick = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async (tokenResponse) => {
      axios.post('http://localhost:3000/auth/google/callback', { tokenResponse }).then(({ data }) => {
        console.log(data);
      });
    },
    onError: (error) => console.log(error),
    flow: 'auth-code',
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
