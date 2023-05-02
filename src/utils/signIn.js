import { api } from "./api";

export async function signInTeacher(name, password) {
  const res = await api.post(`/auth/login/teacher`, {
    name,
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

  console.log('LOOOOG IN', res);

  if (res) {
    localStorage.setItem("accessToken", await res.data.accessToken);
    localStorage.setItem("role", await res.data.role);
    localStorage.setItem("userId", await res.data.teacherId);
    localStorage.setItem("name", name);
    return await res.data.role;
  }
}

export async function signInPupil(name, password) {
  try {
    const res = await api.post(`/auth/login/pupil`, {
      name,
      password,
    });

    localStorage.setItem("accessToken", await res.data.accessToken);
    localStorage.setItem("role", await res.data.role);
    localStorage.setItem("userId", await res.data.userId);
    localStorage.setItem("name", name);
    return await res.data.role;
  } catch (error) {
    console.log("LOGIN ERROR", error);
  }
}
