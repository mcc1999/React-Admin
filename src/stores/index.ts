import { create } from "zustand";
import createUserSlice, { UserSlice } from "./userSlice";
import createSettingSlice, { SettingSlice } from "./settingSlice";

const useReactAdminStore = create<UserSlice & SettingSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createSettingSlice(...a),
}));

export default useReactAdminStore;
