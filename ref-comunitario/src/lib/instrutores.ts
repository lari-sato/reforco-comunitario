import { apiGet } from "./api";
import type { Usuario } from "../Types";

export async function buscarInstrutores(term: string): Promise<Usuario[]> {
  if (!term.trim()) return [];
  return apiGet<Usuario[]>("/api/instrutores/busca", { materia: term });
}
