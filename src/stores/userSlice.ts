import { UserType } from "@/api/user/typing.d";
import { StateCreator } from "zustand";

export interface UserSlice {
  username: string;
  userType: UserType;
  avatar: string;
  storeUserInfo: (info: { username?: string; userType?: UserType }) => void;
}
const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  username: "",
  userType: UserType.STAFF,
  avatar: "",
  storeUserInfo: (newInfo) => set(() => ({ ...newInfo })),
});

export default createUserSlice;
