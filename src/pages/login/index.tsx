import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { postLogin } from "@/api/user";
import { LOGIN_PARAM, TOKEN } from "@/common/localStorage-key";
import { Link, useNavigate } from "react-router-dom";
import useReactAdminStore from "@/stores";
import { ThemeColor } from "@/stores/settingSlice";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const storeUserInfo = useReactAdminStore((state) => state.storeUserInfo);
  const themeColor = useReactAdminStore((state) => state.themeColor);
  const { t } = useTranslation();

  const onFinish = async () => {
    const { remember, ...restValues } = await form.validateFields();
    postLogin(restValues).then((res) => {
      const { token, username, userType } = res.data;

      storeUserInfo({ username, userType });
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
    <div
      className={
        themeColor === ThemeColor.Light
          ? "h-screen flex justify-center items-center bg-[#f9f9f9]"
          : "h-screen flex justify-center items-center bg-[#1a1a1a]"
      }
    >
      <Form
        name="normal_login"
        className={
          themeColor === ThemeColor.Light
            ? "max-w-[400px] min-w-[340px] w-2/5 p-[24px] pt-[48px] rounded-md shadow-[15px_15px_25px_rgba(0,0,0,0.1),-10px_-10px_20px_white]"
            : "max-w-[400px] min-w-[340px] w-2/5 p-[24px] pt-[48px] rounded-md shadow-[15px_15px_25px_black,-10px_-10px_20px_rgba(255,255,255,0.1)]"
        }
        form={form}
        initialValues={{
          ...JSON.parse(localStorage.getItem(LOGIN_PARAM) || "{}"),
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: t("请输入用户名") },
            {
              pattern: /^[a-zA-Z0-9_-]{4,16}$/,
              message: t("用户名应由4-16位英文字母、数字、_或-组成"),
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t("请输入密码") }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t("记住账号")}</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between items-center">
            <Button type="primary" htmlType="submit">
              {t("登录")}
            </Button>
            <Link className="text-blue-500" to="">
              {t("立即注册")}
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
