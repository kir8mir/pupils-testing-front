import { api } from "./api";

export async function getAllQuizes() {
  const res = await api.get(`/quiz/all/`);

  if (res) {
    console.log(await res.data);
  }
}
