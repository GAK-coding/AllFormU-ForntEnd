export interface user {
  id: number;
  nickname: string;
  email: string;
  password: string;
}

export interface signInInfo extends Pick<user, 'email'> {
  password: string;
}

export interface signUpInfo extends signInInfo {
  // eamil, password, name이 들어감
  nickname: string;
}

export interface sendEmail extends Pick<user, 'email'> {
  num: number;
}

export interface myPageInfo {
  id: number;
  email: string;
  nickname: string;
  password?: string;
  userImg?: string;
}

export interface myPageEditInfo {
  id: number;
  nickname: string;
  email: string;
  password: string;
  userImg: string;
}
