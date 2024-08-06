import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate("/dashboard")}>
            Back Dashboard
          </Button>
        }
      />
    </div>
  );
};

export default App;
