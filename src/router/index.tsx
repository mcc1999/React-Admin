import loadable from "@loadable/component";
import withAuth from "@/components/withAuth";
import Layout from "@/layouts";
import { createBrowserRouter } from "react-router-dom";
import route from "./route";
import { Route } from "@ant-design/pro-layout/lib/typing";

const Login = withAuth(loadable(() => import("@/pages/login")));
const Dashboard = withAuth(loadable(() => import("@/pages/dashboard")));
const Table = withAuth(loadable(() => import("@/pages/table")));
const SubTable1 = withAuth(
  loadable(() => import("@/pages/table/subPage/table1")),
);
const SubTable2 = withAuth(
  loadable(() => import("@/pages/table/subPage/table2")),
);
const Admin = withAuth(loadable(() => import("@/pages/admin")));
const NotFound = withAuth(loadable(() => import("@/pages/not-found")));

const pagesMap: Record<string, JSX.Element> = {
  "@/pages/dashboard": <Dashboard />,
  "@/pages/table": <Table />,
  "@/pages/table/subPage/table1": <SubTable1 />,
  "@/pages/table/subPage/table2": <SubTable2 />,
  "@/pages/admin": <Admin />,
};

const resolveRoutes = (route: Route | undefined) => {
  return route?.routes?.map((r: Route) => ({
    path: r.path,
    element: pagesMap[r.component],
    children: resolveRoutes(r),
  }));
};

export const routesWithLayout = resolveRoutes(route);

export const routesWithoutLayout = [
  { path: "/", element: <div>Home</div> },
  { path: "/login", element: <Login /> },
];

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [...routesWithoutLayout, ...routesWithLayout],
    errorElement: <NotFound />,
  },
]);

export default router;
