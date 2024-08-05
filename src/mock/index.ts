import Mock from "mockjs";

const baseURL = import.meta.env.VITE_API_HOST;

/**
 * API：/api/v1/user/current
 */
// Mock.mock(baseURL + "/api/v1/user/current", "get", {
//   code: "10032",
//   msg: "success",
//   data: {
//     id: "@id",
//     username: "@cname",
//     email: "@email",
//     phone: "@string('number', 11)",
//     role: "@pick(['admin', 'editor', 'guest'])",
//   },
// });
Mock.mock(baseURL + "/api/v1/user/current", "get", (req, res) => {
  res.status(401).send({
    code: "10001",
    data: {},
    message: "token失效",
  });
});
