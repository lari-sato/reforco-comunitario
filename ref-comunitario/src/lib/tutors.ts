import { apiGet } from "./api";
import type { Instrutor } from "../types";

// Consulta instrutores por uma ou mais matérias
export async function buscarInstrutoresPorMaterias(materias: string[]): Promise<Instrutor[]> {
  if (materias.length === 0) return [];

  // monta query: /api/instrutores/busca?materias=A&materias=B
  const params = new URLSearchParams();
  materias.forEach(m => params.append("materias", m));

  return apiGet<Instrutor[]>(`/api/instrutores/busca?${params.toString()}`);
}
