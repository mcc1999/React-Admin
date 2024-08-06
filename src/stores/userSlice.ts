import { StateCreator } from "zustand";

export enum UserType {
  STAFF = 1,
  GUEST,
  ADMIN,
}

export interface UserSlice {
  username: string;
  userType: UserType;
  storeUserInfo: (info: { username?: string; userType?: UserType }) => void;
}
const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  username: "",
  userType: UserType.STAFF,
  storeUserInfo: (newInfo) => set(() => ({ ...newInfo })),
});

export default createUserSlice;
