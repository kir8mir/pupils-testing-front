import { api } from "./api";

export default async function getOneTest(id) {
  try {
    const res = await api.get(`/test/one/${id}`);
    return res.data;
  } catch {}
}
