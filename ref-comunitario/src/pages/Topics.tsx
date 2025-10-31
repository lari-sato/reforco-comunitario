// src/pages/Topics.tsx
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import type { Usuario } from "../Types";

type Card = { id: string; titulo: string };

function getNome(u: Usuario | any) {
  return u?.nome ?? u?.nomeCompleto ?? u?.email ?? "Usuário";
}
function getMateria(u: Usuario | any) {
  if (Array.isArray(u?.subjects)) return u.subjects.join(", ");
  return u?.materia ?? u?.assunto ?? "Sem tópico";
}

export function Topics() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();
  const [data, setData] = useState<Usuario[] | any[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const mockCards: Card[] = Array.from({ length: 12 }, (_, i) => ({
    id: `t-${i + 1}`,
    titulo: `Tópico ${i + 1}`,
  }));

  useEffect(() => {
    let active = true;
    async function run() {
      if (!q) {
        setData([]);
        return;
      }
      try {
        setLoading(true);
        setErr(null);
        //const res = await buscarPorMateria(q); quando integrar
        const res: any[] = []; 
        if (active) setData(res);
      } catch {
        if (active) setErr("Erro ao buscar matérias.");
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => { active = false; };
  }, [q]);

  return (
    <main className="topics-page">
      <section className="topics-hero">
        <h1>Bem-Vindo(a)!</h1>
        <p>Selecione um tópico para começar.</p>
      </section>

      {q ? (
        <div className="container" style={{ maxWidth: 876, paddingInline: 16 }}>
          <h2 style={{ margin: "0 0 16px 0", fontWeight: 400 }}>
            Resultados para “{q}”
          </h2>
          {loading && <p>Carregando...</p>}
          {err && <p>{err}</p>}
          {!loading && !err && data.length === 0 && <p>Nenhum resultado encontrado.</p>}

          <ul>
            {data.map((u) => (
              <li key={u.id}>{getNome(u)} – {getMateria(u)}</li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <section className="topics-grid">
            {mockCards.map((c) => (
              <article key={c.id} className="topic-card">
                <div className="topic-card__thumb" />
                <div className="topic-card__title">{c.titulo}</div>
              </article>
            ))}
          </section>

          <div className="topics-cta">
            <Link to="/tutors" className="btn-tutores">
              Buscar Tutores
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
