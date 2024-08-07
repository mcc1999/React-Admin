import request from "@/api/request.tsx";
import { ResGetCurrentUser, ResPostLogin } from "./typing";

export async function getCurrentUser(): Promise<ResGetCurrentUser> {
  return request.get("/api/v1/user/current");
}

export async function postLogin(params: {
  username: string;
  password: string;
}): Promise<ResPostLogin> {
  return request.post("/api/v1/user/login", params);
}

export async function getDashboard() {
  return request.get("/api/v1/dashboard/info", { skipErrorHandler: true });
}
