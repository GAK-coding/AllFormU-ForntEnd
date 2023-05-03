import { useGoogleLogin } from '@react-oauth/google';
import Button from '../../ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { BtnBox } from '../../../pages/SignUp/styles';
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
    <BtnBox>
      <Button onClick={() => loginButtonOnclick()} color={'black'} bgColor={blue} fontSize={1.5} width={20} height={4}>
        <img src="/images/google.png" alt="google" />
        구글 계정 사용하기
      </Button>
    </BtnBox>
  );
};

export default GoogleButton;
