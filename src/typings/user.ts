export interface user {
  id: number;
  name: string;
  email: string;
}

export interface signInInfo extends Pick<user, 'email'> {
  password: string;
}

export interface signUpInfo extends signInInfo {
  name: string;
}

export interface myPageInfo extends Pick<user, 'id'> {
  email: string;
  name: string;
  userImg?: string;
}

export interface myPageEditInfo {
  id: number;
  name: string;
  email: string;
  password: string;
  userImg: string;
}
