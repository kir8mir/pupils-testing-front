import { api } from "./api";

export default async function getAllTests() {
  try {
    const res = await api.get("/test/all");
    return res.data;
  } catch {}
}
