export interface ICredentails {
  email: string;
  password: string;
}
export interface IRegisterCredentails {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: any;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  _id!: string;
  email!: string;
  password!: string;
  salt!: string;
  sign_up_date!: Date;
  firstName!: string;
  lastName!: string;
  address!: string;
  phone!: string;
  photo!: string;
  last_login_date!: Date;
  wallet!: number
  birth_date!: Date;
  signed_up_with!: string;
  activation!: Boolean;
  completedInformation!: Boolean;
  role!: string;
}

export interface IPayload {
  iss: string; //issuer
  iat: Date; //created At
  exp: Date; //expires in
  sub: {
    id: string;
    name: string;
  }; // user details
}
