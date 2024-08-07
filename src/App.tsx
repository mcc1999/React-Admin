import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme as AntdTheme, App as AntdApp } from "antd";
import router from "@/router";
import EscapeAntd from "./components/EscapeAntd";
import useReactAdminStore from "@/stores";
import { Language, ThemeColor } from "@/stores/settingSlice";
import { useEffect } from "react";
import arEG from "antd/locale/ar_EG";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import zhTW from "antd/locale/zh_TW";

const languageLocaleMap = {
  [Language.EN]: enUS,
  [Language.ZH_HANS]: zhCN,
  [Language.ZH_HANT]: zhTW,
  [Language.AR]: arEG,
};

const App: React.FC = () => {
  const themeColor = useReactAdminStore((state) => state.themeColor);
  const pageDirection = useReactAdminStore((state) => state.pageDirection);
  const language = useReactAdminStore((state) => state.language);
  const updateTheme = useReactAdminStore((state) => state.updateTheme);
  const changeLanguage = useReactAdminStore((state) => state.changeLanguage);

  useEffect(() => {
    // 根据 localStorage 初始化 theme、language
    updateTheme();
    changeLanguage(language);

    // 监听系统主题变更
    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
    const listener = () => {
      updateTheme();
    };
    themeMedia.addEventListener("change", listener);

    return () => {
      themeMedia.removeEventListener("change", listener);
    };
  }, []);

  return (
    <ConfigProvider
      locale={languageLocaleMap[language]}
      direction={pageDirection}
      theme={{
        algorithm:
          themeColor === ThemeColor.Light
            ? AntdTheme.defaultAlgorithm
            : AntdTheme.darkAlgorithm,
      }}
    >
      <AntdApp>
        <EscapeAntd />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
