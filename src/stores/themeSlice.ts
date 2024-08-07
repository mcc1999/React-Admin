import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export enum ThemeType {
  Light = "light",
  Dark = "dark",
  SYSTEM = "system",
}
export enum ThemeColor {
  Light = "light",
  Dark = "dark",
}

export interface ThemeSlice {
  theme: ThemeType;
  themeColor: ThemeColor;
  updateTheme: (newTheme?: ThemeType) => void;
}
const createThemeSlice: StateCreator<
  ThemeSlice,
  [],
  [["zustand/persist", { theme: ThemeType; themeColor: ThemeColor }]],
  ThemeSlice
> = persist(
  (set) => ({
    theme: ThemeType.SYSTEM,
    themeColor: ThemeColor.Light,
    updateTheme: (newTheme) =>
      set((state) => {
        const { theme: curTheme, themeColor: curThemeColor } = state;
        const resolveSystemThemeColor = () => {
          const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
          if (themeMedia.matches) {
            return ThemeColor.Light;
          } else {
            return ThemeColor.Dark;
          }
        };
        // 没传入newTheme，若当前是系统theme就根据media prefer更新themeColor
        if (!newTheme) {
          if (curTheme === ThemeType.SYSTEM) {
            return {
              theme: curTheme,
              themeColor: resolveSystemThemeColor(),
            };
          } else {
            // 不改变任何state
            return { theme: curTheme, themeColor: curThemeColor };
          }
        } else {
          // 传入newTheme，根据newTheme和media prefer更新theme和themeColor
          if (newTheme === ThemeType.SYSTEM) {
            return {
              theme: newTheme,
              themeColor: resolveSystemThemeColor(),
            };
          } else {
            return {
              theme: newTheme,
              themeColor:
                newTheme === ThemeType.Dark
                  ? ThemeColor.Dark
                  : ThemeColor.Light,
            };
          }
        }
      }),
  }),
  {
    name: "reactAdminTheme",
    partialize: (state) => ({
      theme: state.theme,
      themeColor: state.themeColor,
    }),
  },
);

export default createThemeSlice;
