import { SmileFilled, CrownFilled, TabletFilled } from "@ant-design/icons";
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
        },
      ],
    },
  ],
};
export default route;
