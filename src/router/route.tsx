import useReactAdminStore from "@/stores";
import { UserType } from "@/stores/userSlice";
import {
  SmileFilled,
  CrownFilled,
  TabletFilled,
  ChromeFilled,
} from "@ant-design/icons";
import { Route } from "@ant-design/pro-layout/lib/typing";

const route: Route = {
  path: "/",
  routes: [
    {
      path: "/dashboard",
      name: "欢迎",
      icon: <SmileFilled />,
      component: "@/pages/dashboard",
    },
    {
      path: "/admin",
      name: "管理",
      icon: <ChromeFilled />,
      component: "@/pages/admin",
      access: "isAdmin",
    },
    {
      path: "/table",
      name: "表格",
      icon: <CrownFilled />,
      component: "@/pages/table",
      hideChildrenInMenu: true,
      routes: [
        {
          path: "/table/sub-table1",
          name: "子表1",
          icon: <TabletFilled />,
          component: "@/pages/table/subPage/table1",
        },
        {
          path: "/table/sub-table2",
          name: "子表2",
          icon: <TabletFilled />,
          component: "@/pages/table/subPage/table2",
          access: "isAdmin",
        },
      ],
    },
  ],
};

const access = () => {
  const userType = useReactAdminStore.getState().userType;
  return {
    isAdmin: userType === UserType.ADMIN,
    isGuest: userType === UserType.GUEST,
    isStaff: userType === UserType.STAFF,
  };
};
const accessMap = access();

const resolveRoutesAuth = (route: Route): Route | null => {
  // @ts-ignore
  if (route.access && !accessMap[route.access]) {
    // 如果当前路由有 access 字段，且对应的 accessMap 值为 false，则返回 null
    return null;
  }

  // 如果当前路由有子路由，则递归处理子路由
  if (route.routes) {
    const filteredRoutes = route.routes
      .map(resolveRoutesAuth) // 递归过滤子路由
      .filter(Boolean); // 去除 null 的路由

    // 返回过滤后的路由对象
    return { ...route, routes: filteredRoutes };
  }

  // 返回当前路由对象
  return route;
};

export default resolveRoutesAuth(route) || {};
