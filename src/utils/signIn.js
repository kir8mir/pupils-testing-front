import { api } from "./api";

export async function signInTeacher(name, password) {
  const res = await api.post(`/auth/login/teacher`, {
    name,
    password,
  });

  if(res) {
    localStorage.setItem("accessToken", await res.data.accessToken);
    return await res.data.role;
  }
};

export async function signInPupil(name, password) {
  const res = await api.post(`/auth/login/pupil`, {
    name,
    password,
  });

  if(res) {
    localStorage.setItem("accessToken", await res.data.accessToken);
    return await res.data.role;
  }
}
