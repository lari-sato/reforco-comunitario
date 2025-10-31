import { apiGet } from "./api";
import type { InstrutorResult } from "../Types";

export async function buscarPorMateria(q: string): Promise<InstrutorResult[]> {
  const data = await apiGet<any[]>("/api/instrutores/busca", { q });

  return (data ?? []).map((it) => {
    const materias =
      Array.isArray(it.materias)
        ? it.materias
        : it.materia
        ? [String(it.materia)]
        : [];

    return {
      id: Number(it.id),
      nome: String(it.nome ?? it.name ?? ""),
      materias,
    } as InstrutorResult;
  });
}
