import { ProLayout } from "@ant-design/pro-components";
import route from "@/router/route";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import useReactAdminStore from "@/stores";
import { routesWithoutLayout } from "@/router";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = useReactAdminStore((state) => state.username);

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
          <InfoCircleFilled key="InfoCircleFilled" />,
          <QuestionCircleFilled key="QuestionCircleFilled" />,
          <GithubFilled key="GithubFilled" />,
        ];
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default Layout;
