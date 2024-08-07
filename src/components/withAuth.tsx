import { getCurrentUser } from "@/api/user";
import { TOKEN, USER_TYPE } from "@/common/localStorage-key";
import useReactAdminStore from "@/stores";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const withAuth =
  <T extends Record<string, unknown>>(Component: React.ComponentType<T>) =>
  (props: T) => {
    // const getBaseInfo = () => {};
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const storeUserInfo = useReactAdminStore((state) => state.storeUserInfo);

    /**
     * 没 token 且不在注册登录页的都转到登录
     */
    const switchRouter = () => {
      const localToken = localStorage.getItem(TOKEN);
      if (!localToken && pathname !== "/login" && pathname !== "/register") {
        navigate("/login");
      }
    };

    /**
     * 获取用户信息
     */
    const fetchUserInfo = async () => {
      try {
        const res = await getCurrentUser();
        localStorage.setItem(USER_TYPE, res.data.userType.toString());
        storeUserInfo(res.data);
        return res.data;
      } catch (error) {
        navigate("/login");
      }
      return undefined;
    };

    useEffect(() => {
      switchRouter();
      fetchUserInfo();
    }, []);

    return <Component {...props} />;
  };

export default withAuth;
