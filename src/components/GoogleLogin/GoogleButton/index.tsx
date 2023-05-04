import { useGoogleLogin } from '@react-oauth/google';
import Button from '../../ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { BtnBox } from '../../../pages/SignUp/styles';

const GoogleButton = () => {
  const { blue } = useRecoilValue(color);

  const loginButtonOnclick = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: (error) => console.log(error),
  });
  return (
    <BtnBox>
      <Button onClick={() => loginButtonOnclick()} color={'black'} bgColor={blue} fontSize={1.5} width={20} height={4}>
        <img src="/images/google.png" alt="google" />
        구글 계정으로 시작
      </Button>
    </BtnBox>
  );
};

export default GoogleButton;
