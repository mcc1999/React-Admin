import { getDashboard } from "@/api/user";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    console.log("dashboard render");
    getDashboard();
  }, []);

  return (
    <PageContainer>
      {t("欢迎")}
      <Button
        onClick={() => {
          setVisible((v) => !v);
        }}
      >
        Click
      </Button>
      <Modal
        open={visible}
        title="Modal"
        onCancel={() => setVisible((v) => !v)}
      >
        Modal
      </Modal>
    </PageContainer>
  );
};

export default Dashboard;
