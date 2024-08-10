import { SETTING } from "@/common/localStorage-key";
import i18n from "@/locale";
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

export enum Language {
  ZH_HANS = "zh-Hans",
  ZH_HANT = "zh-Hant",
  EN = "en",
  AR = "ar",
}

export enum PageDirection {
  LTR = "ltr",
  RTL = "rtl",
}

export interface SettingSlice {
  theme: ThemeType;
  themeColor: ThemeColor;
  language: Language;
  pageDirection: PageDirection;
  updateTheme: (newTheme?: ThemeType) => void;
  changeLanguage: (newLanguage: Language) => void;
}
const createSettingSlice: StateCreator<
  SettingSlice,
  [],
  [["zustand/persist", { theme: ThemeType; themeColor: ThemeColor }]],
  SettingSlice
> = persist(
  (set) => ({
    theme: ThemeType.SYSTEM,
    themeColor: ThemeColor.Light,
    language: Language.ZH_HANS,
    pageDirection: PageDirection.LTR,
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
    changeLanguage: (newLanguage: Language) =>
      set(() => {
        i18n.changeLanguage(newLanguage);
        if (newLanguage === Language.AR) {
          document.body.setAttribute("dir", "rtl");
          return {
            language: newLanguage,
            pageDirection: PageDirection.RTL,
          };
        }
        document.body.setAttribute("dir", "ltr");
        return { language: newLanguage, pageDirection: PageDirection.LTR };
      }),
  }),
  {
    name: SETTING,
    partialize: (state) => ({
      theme: state.theme,
      themeColor: state.themeColor,
      language: state.language,
      pageDirection: state.pageDirection,
    }),
  },
);

export default createSettingSlice;
