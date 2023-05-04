import { api } from "./api";

export async function createMyProfile(pupilOrTeacher, { name, password }) {
  try {
    if (!pupilOrTeacher) {
      return await api.post(`http://176.223.141.42:8080/teacher`, {
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
  }
}
