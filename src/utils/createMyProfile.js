import { api } from "./api";

export async function createMyProfile(pupilOrTeacher, { name, password }) {
  try {
    const allTeachers = await api.get(`/teacher/all`);
    const allPupils = await api.get(`/pupil/all`);

    if (!pupilOrTeacher) {
      if (allTeachers.data.some(teacher => teacher.name === name)) return null;
      return await api.post(`/teacher`, {
        name,
        password,
        role: "teacher",
      });
    } else {
      if (allPupils.data.some(pupil => pupil.name === name)) return null;
      return await api.post(`/pupil`, {
        name,
        password,
        role: "pupil",
      });
    }
  } catch {
    return null;
  }
}
