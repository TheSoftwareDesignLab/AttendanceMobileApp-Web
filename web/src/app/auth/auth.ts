export interface Credentials {
  email: string;
  password: string;
}

export interface SignedUpInfo extends User {
  token?: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  faculty?: string;
  department?: string;
  institution?: string;
}
