import request from "@/api/request.tsx";

export async function getCurrentUser() {
  return request.get("/api/v1/user/current");
}

export async function postLogin(params: {
  username: string;
  password: string;
}) {
  return request.post("/api/v1/user/login", params);
}

export async function getDashboard() {
  return request.get("/api/v1/dashboard/info111", { skipErrorHandler: true });
}
