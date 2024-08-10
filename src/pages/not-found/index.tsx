import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/dashboard">
            <Button type="primary">Back Dashboard</Button>
          </Link>
        }
      />
    </div>
  );
};

export default App;
