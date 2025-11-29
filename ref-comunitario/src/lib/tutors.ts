import { apiGet } from "./api";
import type { Instrutor } from "../types";

// Consulta instrutores por uma ou mais matérias
export async function buscarInstrutoresPorMaterias(
  materias: string[],
): Promise<Instrutor[]> {
  if (materias.length === 0) return [];

  // bate em GET /api/instrutores/busca?materias=A&materias=B&...
  return apiGet<Instrutor[]>("/api/instrutores/busca", { materias });
}
