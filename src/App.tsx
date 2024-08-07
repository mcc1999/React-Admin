import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme as AntdTheme, App as AntdApp } from "antd";
import router from "@/router";
import EscapeAntd from "./components/EscapeAntd";
import useReactAdminStore from "@/stores";
import { ThemeColor } from "@/stores/themeSlice";
import { useEffect } from "react";

const App: React.FC = () => {
  const themeColor = useReactAdminStore((state) => state.themeColor);
  const updateTheme = useReactAdminStore((state) => state.updateTheme);

  useEffect(() => {
    updateTheme();

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
