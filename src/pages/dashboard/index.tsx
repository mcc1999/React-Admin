import { getDashboard } from "@/api/user";
import useReactAdminStore from "@/stores";
import { UserType } from "@/stores/userSlice";
import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { useEffect } from "react";

const Dashboard: React.FC = () => {
  const storeUserInfo = useReactAdminStore((state) => state.storeUserInfo);
  useEffect(() => {
    console.log("dashboard render");
    getDashboard();
  }, []);

  return (
    <PageContainer>
      Dashboard
      <Button
        onClick={() => {
          storeUserInfo({
            username: "xxxx",
            userType: UserType.ADMIN,
          });
        }}
      >
        Click
      </Button>
    </PageContainer>
  );
};

export default Dashboard;
