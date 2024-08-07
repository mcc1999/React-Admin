import { ProLayout } from "@ant-design/pro-components";
import route from "@/router/route";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BgColorsOutlined,
  GithubFilled,
  GlobalOutlined,
  LaptopOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import useReactAdminStore from "@/stores";
import { routesWithoutLayout } from "@/router";
import { Language, ThemeType } from "@/stores/settingSlice";
import { useTranslation } from "react-i18next";
import { Route } from "@ant-design/pro-layout/lib/typing";
import { cloneDeep } from "lodash";
import { useMemo } from "react";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const username = useReactAdminStore((state) => state.username);
  const avatar = useReactAdminStore((state) => state.avatar);
  const theme = useReactAdminStore((state) => state.theme);
  const language = useReactAdminStore((state) => state.language);
  const changeLanguage = useReactAdminStore((state) => state.changeLanguage);
  const updateTheme = useReactAdminStore((state) => state.updateTheme);

  const resolveRouteI18n = (route: Route) => {
    if (route.name) {
      route.name = t(route.name);
    }
    if (route.routes) {
      route.routes.forEach(resolveRouteI18n);
    }
    return route;
  };

  const i18nRoute = useMemo(
    () => resolveRouteI18n(cloneDeep(route)),
    [language],
  );

  return routesWithoutLayout.findIndex((r) => r.path === location.pathname) !==
    -1 ? (
    <Outlet />
  ) : (
    <ProLayout
      className="h-screen"
      layout="mix"
      title="React Admin"
      route={i18nRoute}
      menuItemRender={(item, dom) => {
        return <Link to={item.itemPath}>{dom}</Link>;
      }}
      fixedHeader
      avatarProps={{
        src: avatar,
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
                    label: t("退出登录"),
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
              selectedKeys: [language],
              items: [
                {
                  key: Language.ZH_HANS,
                  icon: "🇨🇳",
                  label: "简体中文",
                },
                {
                  key: Language.ZH_HANT,
                  icon: "🇨🇳",
                  label: "繁體中文",
                },
                {
                  key: Language.EN,
                  icon: "🇺🇸",
                  label: "English",
                },
                {
                  key: Language.AR,
                  icon: "🇦🇪",
                  label: "عربي",
                },
              ],
              onClick: ({ key }) => {
                changeLanguage(key as Language);
              },
            }}
          >
            <GlobalOutlined />
          </Dropdown>,
          <Dropdown
            menu={{
              selectedKeys: [theme],
              items: [
                {
                  key: ThemeType.Light,
                  icon: <SunOutlined />,
                  label: t("浅色"),
                },
                {
                  key: ThemeType.Dark,
                  icon: <MoonOutlined />,
                  label: t("深色"),
                },
                {
                  key: ThemeType.SYSTEM,
                  icon: <LaptopOutlined />,
                  label: t("系统"),
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
