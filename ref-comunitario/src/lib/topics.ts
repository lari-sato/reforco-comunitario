import { apiGet } from "./api";
import type { Topico } from "../types";

export async function getTopicos(): Promise<Topico[]> {
  return apiGet<Topico[]>("/api/usuarios/topicos");
}
