import { getDashboard } from "@/api/user";
import { PageContainer } from "@ant-design/pro-components";
import { useEffect } from "react";

const Dashboard: React.FC = () => {
  useEffect(() => {
    console.log("dashboard render");
    getDashboard();
  }, []);

  return <PageContainer>Dashboard</PageContainer>;
};

export default Dashboard;
