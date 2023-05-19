export interface user {
  id: number;
  nickname: string;
  email: string;
  password: string;
}

export interface googleUser extends Pick<user, 'email'> {
  nickname: string;
}

export interface signInInfo extends Pick<user, 'email'> {
  password: string;
}

export interface signUpInfo extends signInInfo {
  // eamil, password, name이 들어감
  nickname: string;
}

export interface sendEmail extends Pick<user, 'email'> {
  num?: number;
}

export interface newInfo extends Pick<user, 'id'> {
  newNickname?: string;
  password?: string;
  newPwd?: string;
}
