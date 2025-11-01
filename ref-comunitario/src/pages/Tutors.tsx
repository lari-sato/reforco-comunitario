/* A integração com o back-end está comentada. Terminaremos de implementar
essa página quando a API de instrutores estiver pronta. */

import { useMemo } from "react";
//import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
//import { buscarInstrutoresPorMaterias } from "../lib/tutors";
import type { Instrutor } from "../types";

// Mock de instrutores
const MOCK_INSTRUTORES: Instrutor[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nome: `Tutor ${i + 1}`,
  materias: ["[Descrição]"],
}));

export function Tutors() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const materias = params.getAll("materias").map(s => s.trim()).filter(Boolean);
 // const materias = params.getAll("materias");

  /*const [data, setData] = useState<Instrutor[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (materias.length === 0) {
        setData([]);
        return;
      }
      try {
        setErr(null);
        setLoading(true);
        const res = await buscarInstrutoresPorMaterias(materias);
        if (alive) setData(res ?? []);
      } catch {
        if (alive) setErr("Erro ao buscar instrutores.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [materias]); */

  const data = useMemo(() => {
    if (materias.length === 0) return MOCK_INSTRUTORES;
    return MOCK_INSTRUTORES.filter(t =>
      materias.every(m => (t.materias ?? []).some(x => x.includes(m)))
    );
  }, [materias]);

  return (
    <main className="tutors">
      <div className="container">
        <p className="tutors__hint">Clique em um tutor para expandir seu perfil.</p>

        <div className="tutors__bar">
          <h2 className="tutors__title">Tutores</h2>
          <button className="tutors__filter" aria-label="Filtrar">{/* ícone */}</button>
        </div>

        <section className="tutors__grid">
          {data.map((t) => (
            <article key={t.id} className="tutor">
              <div className="tutor__avatar" aria-hidden="true" />
              <div className="tutor__name">Tutor</div>
              <div className="tutor__desc">{t.materias?.[0] ?? "[Descrição]"}</div>
            </article>
          ))}
        </section>

        <div className="tutors__pager">
          <button className="pager__btn" aria-label="Anterior">◀</button>
          <span className="pager__label">1/30</span>
          <button className="pager__btn" aria-label="Próxima">▶</button>
        </div>

        <div className="tutors__footer">
          <button className="btn-voltar" onClick={() => navigate(-1)}>Voltar</button>
        </div>
      </div>
    </main>
  );
}