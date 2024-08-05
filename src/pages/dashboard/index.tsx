import { getDashboard } from "@/api/user";
import { useEffect } from "react";

const Dashboard: React.FC = () => {
  useEffect(() => {
    console.log("dashboard render");
    getDashboard();
  }, []);

  return <>Dashboard</>;
};

export default Dashboard;
