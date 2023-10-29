export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  photo: string;
  password_confirmation: string | null;
  gender: string;
  date_of_birth: string;
  marital_status: string;
  status: string;
  role: string;
  token: string | null;
  nationality_id: string | null;
}

export interface IDocument {
  id: string;
  code: string;
  name: string;
  photo: string;
  verified_at: string;
}

export interface INationality {
  id: string;
  name: string;
  code: string;
  flag: string;
}
