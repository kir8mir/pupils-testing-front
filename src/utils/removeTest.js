import { api } from "./api";

export async function removeTest(id) {
  try {
    return await api.delete(`/test/one/${id}`);
  } catch {
    console.log("EROOOORR ON SEND PUPIL ANSWERS");
  }
}
