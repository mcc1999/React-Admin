import { ResBase } from "../global";

export enum UserType {
  GUEST = 1,
  STAFF,
  ADMIN,
}

// ==== Request Params Type ====


// ==== Response Type ====
export interface ResGetCurrentUser extends ResBase {
  data: {
    username: string;
    userType: UserType;
    avatar: string;
  };
}

export interface ResPostLogin extends ResBase {
  data: {
    token: string;
    username: string;
    userType: UserType;
  };
}
