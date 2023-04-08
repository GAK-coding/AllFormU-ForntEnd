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
