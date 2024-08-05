import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme, App as AntdApp } from "antd";
import router from "@/router";
import EscapeAntd from "./components/EscapeAntd";

const App: React.FC = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <AntdApp>
        <EscapeAntd />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
