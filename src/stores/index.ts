import { create } from "zustand";
import createUserSlice, { UserSlice } from "./userSlice";

const useReactAdminStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));

export default useReactAdminStore;
