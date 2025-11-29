import { useState } from "react";
//import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { getTopicos } from "../lib/topics";
import type { Topico } from "../types";

  // Mock de matérias 
  const MOCK_TOPICOS: Topico[] = [
    { id: 1, nome: "Matemática" },
    { id: 2, nome: "Português" },
    { id: 3, nome: "Inglês" },
    { id: 4, nome: "Física" },
    { id: 5, nome: "Química" },
    { id: 6, nome: "Biologia" },
    { id: 7, nome: "História" },
    { id: 8, nome: "Geografia" },
    { id: 9, nome: "Redação" },
    { id: 10, nome: "Programação" },
    { id: 11, nome: "Artes" },
    { id: 12, nome: "Educação Financeira" },
  ];

export function Topics() {
  const navigate = useNavigate();
  const [topicos] = useState<Topico[]>(MOCK_TOPICOS);
  //const [topicos, setTopicos] = useState<Topico[]>([]);
  //const [loading, setLoading] = useState(false);
  //const [err, setErr] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  /*useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setErr(null);
        setLoading(true);
        const data = await getTopicos();
        if (alive) setTopicos(data ?? []);
      } catch {
        if (alive) setErr("Erro ao carregar matérias.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []); */

  function alternarMaterias(nome: string) {
    setSelected((prev) =>
      prev.includes(nome) ? prev.filter((x) => x !== nome) : [...prev, nome]
    );
  }

  function buscarTutores() {
    if (selected.length === 0) return;
    const params = new URLSearchParams();
    selected.forEach((m) => params.append("materias", m));
    navigate(`/tutors?${params.toString()}`);
  }

  return (
    <main className="topics-page">
      <section className="topics-hero">
        <h1>Bem-vindo(a)!</h1>
        <p>Selecione pelo menos um tópico para começar.</p>
      </section>

      <div className="container" style={{ maxWidth: 876, paddingInline: 16 }}>
        {/*loading && <p>Carregando…</p>}
        {err && <p>{err}</p>*/}

        <section className="topics-grid">
          {topicos.map((t) => (
            <article
              key={t.id}
              className="topic-card"
              onClick={() => alternarMaterias(t.nome)}
              style={{
                outline: selected.includes(t.nome) 
                ? "3px solid #065535" 
                : "none",
                cursor: "pointer",
              }}
              aria-pressed={selected.includes(t.nome)}
            >
              <div className="topic-card__thumb" />
              <div className="topic-card__title">{t.nome}</div>
            </article>
          ))}
        </section>

        <div className="topics-cta">
          <button
            className="btn-tutores"
            onClick={buscarTutores}
            disabled={selected.length === 0}
            aria-disabled={selected.length === 0}
          >
            Buscar Tutores
          </button>
        </div>
      </div>
    </main>
  );
}

/* IMPLEMENTAÇÃO COM BACK COMENTADA:
 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopicos } from "../lib/topics";
import type { Topico } from "../types";

export function Topics() {
  const navigate = useNavigate();
  const [topicos, setTopicos] = useState<Topico[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setErr(null);
        setLoading(true);
        const data = await getTopicos();
        if (alive) setTopicos(data ?? []);
      } catch {
        if (alive) setErr("Erro ao carregar matérias.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  function alternarMaterias(nome: string) {
    setSelected((prev) =>
      prev.includes(nome) ? prev.filter((x) => x !== nome) : [...prev, nome]
    );
  }

  function buscarTutores() {
    if (selected.length === 0) return;
    const params = new URLSearchParams();
    selected.forEach((m) => params.append("materias", m));
    navigate(`/tutors?${params.toString()}`);
  }

  return (
    <main className="topics-page">
      <section className="topics-hero">
        <h1>Bem-vindo(a)!</h1>
        <p>Selecione pelo menos um tópico para começar.</p>
      </section>

      <div className="container" style={{ maxWidth: 876, paddingInline: 16 }}>
        {loading && <p>Carregando…</p>}
        {err && <p>{err}</p>}

        <section className="topics-grid">
          {topicos.map((t) => (
            <article
              key={t.id}
              className="topic-card"
              onClick={() => alternarMaterias(t.nome)}
              style={{
                outline: selected.includes(t.nome)
                  ? "3px solid #065535"
                  : "none",
                cursor: "pointer",
              }}
              aria-pressed={selected.includes(t.nome)}
            >
              <div className="topic-card__thumb" />
              <div className="topic-card__title">{t.nome}</div>
            </article>
          ))}
        </section>

        <div className="topics-cta">
          <button
            className="btn-tutores"
            onClick={buscarTutores}
            disabled={selected.length === 0}
            aria-disabled={selected.length === 0}
          >
            Buscar Tutores
          </button>
        </div>
      </div>
    </main>
  );
} */
