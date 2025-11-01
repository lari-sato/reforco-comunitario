import { apiGet } from "./api";
import type { Topico } from "../types";

// GET /api/users/topicos  -> List<Topico>
export async function getTopicos(): Promise<Topico[]> {
  return apiGet<Topico[]>("/api/users/topicos");
}
