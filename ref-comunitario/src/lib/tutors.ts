import { apiGet } from "./api";
import type { Instrutor } from "../types";

// GET /api/instrutores/busca?materias=A&materias=B -> List<Instrutor>
export async function buscarInstrutoresPorMaterias(materias: string[]): Promise<Instrutor[]> {
  return apiGet<Instrutor[]>("/api/instrutores/busca", { materias });
}
