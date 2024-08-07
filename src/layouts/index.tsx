import { ProLayout } from "@ant-design/pro-components";
import route from "@/router/route";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BgColorsOutlined,
  GithubFilled,
  LogoutOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import useReactAdminStore from "@/stores";
import { routesWithoutLayout } from "@/router";
import { ThemeType } from "@/stores/themeSlice";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = useReactAdminStore((state) => state.username);
  const theme = useReactAdminStore((state) => state.theme);
  const updateTheme = useReactAdminStore((state) => state.updateTheme);

  return routesWithoutLayout.findIndex((r) => r.path === location.pathname) !==
    -1 ? (
    <Outlet />
  ) : (
    <ProLayout
      className="h-screen"
      layout="mix"
      title="React Admin"
      route={route}
      menuItemRender={(item, dom) => (
        <div onClick={() => navigate(item.itemPath)}>{dom}</div>
      )}
      fixedHeader
      avatarProps={{
        src: "https://loremflickr.com/300/300",
        size: "small",
        title: username,
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "退出登录",
                  },
                ],
                onClick: ({ key }) => {
                  if (key === "logout") navigate("/login");
                },
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        return [
          <GithubFilled key="GithubFilled" />,
          <Dropdown
            menu={{
              selectedKeys: [theme],
              items: [
                {
                  key: ThemeType.Light,
                  icon: <SunOutlined />,
                  label: "Light",
                },
                {
                  key: ThemeType.Dark,
                  icon: <MoonOutlined />,
                  label: "Dark",
                },
                {
                  key: ThemeType.SYSTEM,
                  icon: <SettingOutlined />,
                  label: "System",
                },
              ],
              onClick: ({ key }) => {
                // @ts-ignore
                updateTheme(key);
              },
            }}
          >
            <BgColorsOutlined />
          </Dropdown>,
        ];
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default Layout;
