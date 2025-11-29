import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { Instrutor } from "../types";
import { PagerButtons } from "../components/PagerButtons";
import { TutorCard } from "../components/TutorCard";
import { BackButton } from "../components/BackButton";
import { HelpButton } from "../components/HelpButton";

const MOCK_INSTRUTORES: Instrutor[] = [
  { id: 1, nome: "Ana Souza", materias: ["Matemática", "Física"] },
  { id: 2, nome: "Bruno Oliveira", materias: ["Matemática", "Química"] },
  { id: 3, nome: "Camila Fernandes", materias: ["Inglês", "Redação"] },
  { id: 4, nome: "Daniel Ribeiro", materias: ["Matemática", "Física", "Química"] },
  { id: 5, nome: "Eduarda Santos", materias: ["Química", "Biologia"] },
  { id: 6, nome: "Felipe Costa", materias: ["Biologia"] },
  { id: 7, nome: "Gabriela Lima", materias: ["História", "Geografia"] },
  { id: 8, nome: "Henrique Almeida", materias: ["Geografia"] },
  { id: 9, nome: "Isabela Martins", materias: ["Redação", "Português"] },
  { id: 10, nome: "João Pereira", materias: ["Programação", "Matemática"] },
  { id: 11, nome: "Larissa Azevedo", materias: ["Artes"] },
  { id: 12, nome: "Marcos Carvalho", materias: ["Educação Financeira", "Matemática"] },
];

export function Tutors() {
  const [params] = useSearchParams();
  const materias = params.getAll("materias").map(s => s.trim()).filter(Boolean);

  const data = useMemo(() => {
    if (materias.length === 0) return MOCK_INSTRUTORES;
    return MOCK_INSTRUTORES.filter(t =>
      materias.every(m => (t.materias ?? []).some(x => x.toLowerCase() === m.toLowerCase()))
    );
  }, [materias]);

  return (
    <main className="tutors">
      <section className="tutors-hero">
        <h1>Boa!</h1>
        <p>Agora, selecione um instrutor para solicitar ajuda.</p>
      </section>

      <div className="tutors__container">
        <section className="tutors__grid">
          {data.map((t) => (
            <TutorCard key={t.id} nome={t.nome} />
          ))}
        </section>

        <PagerButtons />

        <div className="tutors__footer">
          <BackButton to="/topics" />
          <HelpButton />
        </div>
      </div>
    </main>
  );
}

/* IMPLEMENTAÇÃO COM BACK COMENTADA:
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { buscarInstrutoresPorMaterias } from "../lib/tutors";
import type { Instrutor } from "../types";
import { PagerButtons } from "../components/PagerButtons";
import { TutorCard } from "../components/TutorCard";
import { BackButton } from "../components/BackButton";
import { HelpButton } from "../components/HelpButton";

export function Tutors() {
  const [params] = useSearchParams();
  const materias = params.getAll("materias").map(m => m.trim()).filter(Boolean);

  const [data, setData] = useState<Instrutor[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
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
  }, [materias]);

  const filtered = useMemo(() => data, [data]);

  return (
    <main className="tutors">
      <section className="tutors-hero">
        <h1>Boa!</h1>
        <p>Agora, selecione um instrutor para solicitar ajuda.</p>
      </section>

      <div className="tutors__container">
        {loading && <p>Carregando…</p>}
        {err && <p>{err}</p>}

        <section className="tutors__grid">
          {filtered.map((t) => (
            <TutorCard
              key={t.id}
              nome={t.nome}
            />
          ))}
        </section>

        <PagerButtons />

        <div className="tutors__footer">
          <BackButton to="/topics" />
          <HelpButton />
        </div>
      </div>
    </main>
  );
}/*
} */