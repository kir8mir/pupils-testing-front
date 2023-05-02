import { api } from "./api";

export default async function getAllPupils() {
  try {
    const res = await api.get("/pupil/all");
    return res.data;
  } catch {}
}
