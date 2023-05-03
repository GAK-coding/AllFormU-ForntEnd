import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import GoogleButton from '../GoogleButton';

interface Props {
  clientId: string;
}

const GoogleAuth: React.FC<Props> = ({ clientId }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <GoogleButton />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
