import { api } from "./api";

export async function getAllPupilAnswers() {
  try {
    return await api.get(`/pupil-answer/all`);
  } catch {console.log('ERORR ON GET PUPIL ANSWERS');}
}
