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

const pagePathWithoutLayout = ["/", "/login"];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return pagePathWithoutLayout.includes(location.pathname) ? (
    <Outlet />
  ) : (
    <ProLayout
      className="h-screen"
      layout="mix"
      title="React Admin"
      location={window.location}
      route={route}
      menuItemRender={(item, dom) => (
        <div onClick={() => navigate(item.itemPath)}>{dom}</div>
      )}
      fixedHeader
      avatarProps={{
        src: "https://picsum.photos/200",
        size: "small",
        title: "username",
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
