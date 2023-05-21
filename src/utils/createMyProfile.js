import { api } from "./api";

export async function createMyProfile(pupilOrTeacher, { name, password }) {
  try {
    const allTeachers = await api.get(`/teacher/all`);
    const allPupils = await api.get(`/pupil/all`);
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!pupilOrTeacher) {
      if (allTeachers.data.some((teacher) => teacher.name === trimmedName))
        return null;
      return await api.post(`/teacher`, {
        name: trimmedName,
        password: trimmedPassword,
        role: "teacher",
      });
    } else {
      if (allPupils.data.some((pupil) => pupil.name === trimmedName)) return null;
      return await api.post(`/pupil`, {
        name: trimmedName,
        password: trimmedPassword,
        role: "pupil",
      });
    }
  } catch {
    return null;
  }
}
