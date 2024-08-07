import { create } from "zustand";
import createUserSlice, { UserSlice } from "./userSlice";
import createThemeSlice, { ThemeSlice } from "./themeSlice";

const useReactAdminStore = create<UserSlice & ThemeSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createThemeSlice(...a),
}));

export default useReactAdminStore;
