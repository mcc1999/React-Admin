import { createBrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import withAuth from "@/components/withAuth";

const Login = withAuth(loadable(() => import("@/pages/login")));
const Dashboard = withAuth(loadable(() => import("@/pages/dashboard")));

const router = createBrowserRouter([
  { path: "/", element: <div>Home</div> },
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default router;
