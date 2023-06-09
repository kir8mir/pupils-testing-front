import { api } from "./api";

export async function signInTeacher(name, password) {
  const res = await api.post(`/auth/login/teacher`, {
    name: name.trim(),
    password,
  });

  api.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

  if (res) {
    localStorage.setItem("accessToken", await res.data.accessToken);
    localStorage.setItem("role", await res.data.role);
    localStorage.setItem("userId", await res.data.teacherId);
    localStorage.setItem("name",  name.trim());
    return await res.data.role;
  } else {
    return null;
  }

}

export async function signInPupil(name, password) {
  try {
    const res = await api.post(`/auth/login/pupil`, {
      name: name.trim(),
      password: password.trim(),
    });

    localStorage.setItem("accessToken", await res.data.accessToken);
    localStorage.setItem("role", await res.data.role);
    localStorage.setItem("userId", await res.data.userId);
    localStorage.setItem("name",  name.trim());
    return await res.data.role;
  } catch (error) {

  }
}
