import { api } from "./api";

export async function createMyProfile(pupilOrTeacher, { name, password }) {
  try {
    if (!pupilOrTeacher) {
      return await api.post(`/teacher`, {
        name,
        password,
        role: "teacher",
      });
    } else {
      return await api.post(`/pupil`, {
        name,
        password,
        role: "pupil",
      });
    }
  } catch {
    console.log("ERROOOORR");
    return null;
  }
}
