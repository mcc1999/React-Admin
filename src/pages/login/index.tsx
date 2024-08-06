import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { postLogin } from "@/api/user";
import { LOGIN_PARAM, TOKEN } from "@/common/localStorage-key";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async () => {
    const { remember, ...restValues } = await form.validateFields();
    postLogin(restValues).then((res) => {
      const { token } = res.data;
      localStorage.setItem(TOKEN, token);
      if (remember) {
        // password不应该明文存储，需加密，这里简单处理。
        localStorage.setItem(
          LOGIN_PARAM,
          JSON.stringify({ remember, ...restValues }),
        );
      } else {
        localStorage.removeItem(LOGIN_PARAM);
      }
      navigate("/dashboard");
    });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#f9f9f9]">
      <Form
        name="normal_login"
        className="max-w-[400px] min-w-[340px] w-2/5 p-[24px] pt-[48px] rounded-md shadow-[12px_12px_12px_rgba(0,0,0,0.1),-10px_-10px_10px_white]"
        form={form}
        initialValues={{
          ...JSON.parse(localStorage.getItem(LOGIN_PARAM) || "{}"),
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "请输入用户名" },
            {
              pattern: /^[a-zA-Z0-9_-]{4,16}$/,
              message: "用户名应由4-16位英文字母、数字、_或-组成",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
