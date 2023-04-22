import { api } from "./api";

export default async function signIn(name, password) {
  const token = await api.post(`/auth/login`, {
    name,
    password,
  });

  if(token) {
    localStorage.setItem("accessToken", await token.data.accessToken);
    return localStorage.getItem("accessToken");
  }
}
