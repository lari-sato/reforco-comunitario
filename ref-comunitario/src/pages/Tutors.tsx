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
}
