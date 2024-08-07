import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { message, notification } from "@/components/EscapeAntd";
import { getErrorMsg } from "@/common/error-msg";
import { TOKEN } from "@/common/localStorage-key";
import router from "@/router";
import useReactAdminStore from "@/stores";
import { UserType } from "@/api/user/typing.d";

// 扩展 axios 的 TS 类型
declare module "axios" {
  export interface AxiosRequestConfig {
    /** 是否跳过统一错误处理 */
    skipErrorHandler?: boolean;
  }
}

const config = {
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 5000,
};

const service = axios.create(config);

// Token的拦截器
const requestTokenInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  const token = localStorage.getItem(TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};
// 访客接口拦截器
const guestRequestTokenInterceptor = (
  config: InternalAxiosRequestConfig<any>,
) => {
  const userType = useReactAdminStore.getState().userType;
  const accessibleURL = [
    "/api/v1/guestInfo",
    // ...
  ];

  if (
    config.method !== "get" &&
    userType === UserType.GUEST &&
    !accessibleURL.includes(config.url!)
  ) {
    message.error("访客没有权限发送此请求！");
    throw "访客没有权限发送此请求";
  } else {
    return config;
  }
};
// request异常处理程序
const requestErrorHandler = (error: any) => {
  const { request } = error;
  if (!request || request.options?.skipErrorHandler) throw error;

  throw error;
};

const redirectToLogin = () => {
  localStorage.removeItem(TOKEN);
  router.navigate("/login");
};

// 处理http status === 200，但返回的code为鉴权失败的情况
const handleAuthError = (response: AxiosResponse) => {
  const { code } = response.data;
  const { skipErrorHandler } = response.config;

  const authErrMap: any = {
    "10031": "登录失效，需要重新登录", // token 失效
    "10032": "您太久没登录，请重新登录~", // token 过期
    // ...
  };
  if (authErrMap[code]) {
    if (skipErrorHandler) return Promise.reject(authErrMap[code]);
    message.error(authErrMap[code]);
    // 授权错误，登出账户
    redirectToLogin();
    return false;
  }
  return true;
};

// 处理http status === 200，但返回的code为其他失败的情况——直接 Toast 接口返回的 message
const handleGeneralError = (response: AxiosResponse) => {
  const { code, message: msg } = response.data;
  const { skipErrorHandler } = response.config;

  if (code !== "200") {
    if (skipErrorHandler) return Promise.reject(msg);
    message.error(msg);
  }
};

const responseInterceptor = (response: AxiosResponse) => {
  if (response.status !== 200) return Promise.reject(response.data);

  const result = handleAuthError(response);
  // 没有权限错误，才处理通用错误
  if (result === true) {
    handleGeneralError(response);
  }

  return response.data;
};

// 异常处理程序, http status !== 2xx 情形
const responseErrorHandler = (error: any) => {
  const { response } = error;
  const { skipErrorHandler } = error.config;
  if (skipErrorHandler) return Promise.reject(error);

  if (response && response.status) {
    const { status } = response;
    if (status === 401) {
      redirectToLogin();
    } else {
      // 部分http status !== 2xx 业务上属于非错误，在这里做特殊处理
      // 详见 getErrorMsg 中的 noError
      if (getErrorMsg(error.data) === "noError") {
        console.log("noError");
        return;
      } else {
        let errMessage = "未知错误";
        switch (status) {
          case 400:
            errMessage = "错误的请求";
            break;
          case 403:
            errMessage = "拒绝访问";
            break;
          case 404:
            errMessage = "请求错误,未找到该资源";
            break;
          case 405:
            errMessage = "请求方法未允许";
            break;
          case 408:
            errMessage = "请求超时";
            break;
          case 500:
            errMessage = "服务器端出错";
            break;
          case 501:
            errMessage = "网络未实现";
            break;
          case 502:
            errMessage = "网络错误";
            break;
          case 503:
            errMessage = "服务不可用";
            break;
          case 504:
            errMessage = "网络超时";
            break;
          case 505:
            errMessage = "http版本不支持该请求";
            break;
          default:
            errMessage = `其他连接错误 --${status}`;
        }
        message.error(errMessage);
        return;
      }
    }
  } else {
    notification.error({
      description: "您的网络发生异常，无法连接服务器",
      message: "网络异常",
    });
  }

  throw error;
};

/**
 * request需要拦截的情形如下：
 * 1. 所有接口添加token
 * 2. 访客的 非 GET 请求，除特定接口外，不可发送
 */
service.interceptors.request.use(requestTokenInterceptor, requestErrorHandler);
service.interceptors.request.use(
  guestRequestTokenInterceptor,
  requestErrorHandler,
);

/**
 * response需要拦截的情形如下：
 * 1. http status !== 200，报错
 * 2. http status === 200, 处理 鉴权 / 一般 报错
 * 3. request options 中 skipErrorHandler 为 true
 */
service.interceptors.response.use(responseInterceptor, responseErrorHandler);

export default service;
