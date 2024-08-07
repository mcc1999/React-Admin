import Mock from "mockjs";

const baseURL = import.meta.env.VITE_API_HOST;

/**
 * Url: /api/v1/user/current
 */
Mock.mock(baseURL + "/api/v1/user/current", "get", {
  code: "200",
  message: "success",
  data: {
    username: "@cname",
    userType: "@pick([2, 3])",
    avatar: "@image()",
  },
});

/**
 * Url: /api/v1/user/current
 */
Mock.mock(baseURL + "/api/v1/user/login", "post", {
  code: "200",
  message: "success",
  data: {
    username: "@cname",
    userType: "@pick([1, 2, 3])",
    token: "wgnbzjkdyrna|3",
  },
});

/**
 * Url: /api/v1/dashboard/info
 */
Mock.mock(baseURL + "/api/v1/dashboard/info", "get", {
  code: "200",
  message: "success",
  data: {
    dashboardId: "@id",
  },
});
