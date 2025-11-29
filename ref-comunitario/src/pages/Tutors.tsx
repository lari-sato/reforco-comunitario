import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Instrutor } from "../types";
import { TutorCard } from "../components/TutorCard";
import { BackButton } from "../components/BackButton";
import { HelpButton } from "../components/HelpButton";
import { PagerButtons } from "../components/PagerButtons";

const PAGE_SIZE = 8;

const MOCK_INSTRUTORES: Instrutor[] = [
  { id: 1, nome: "Ana Souza", materias: ["Matemática"] },
  { id: 2, nome: "Bruno Oliveira", materias: ["Matemática"] },
  { id: 3, nome: "Carlos Mendes", materias: ["Matemática"] },
  { id: 4, nome: "Daniel Ribeiro", materias: ["Matemática"] },
  { id: 5, nome: "Eduardo Moraes", materias: ["Matemática"] },
  { id: 6, nome: "Fernanda Lopes", materias: ["Matemática"] },
  { id: 7, nome: "Gustavo Silva", materias: ["Matemática"] },
  { id: 8, nome: "Helena Costa", materias: ["Matemática"] },
  { id: 9, nome: "Igor Almeida", materias: ["Matemática"] },
  { id: 10, nome: "Joana Matos", materias: ["Física"] },
  { id: 11, nome: "Kevin Duarte", materias: ["Física"] },
  { id: 12, nome: "Larissa Prado", materias: ["Física"] },
  { id: 13, nome: "Mário Campos", materias: ["Física"] },
  { id: 14, nome: "Natália Freire", materias: ["Física"] },
  { id: 15, nome: "Otávio Santos", materias: ["Física"] },
  { id: 16, nome: "Patrícia Luz", materias: ["Física"] },
  { id: 17, nome: "Rafael Teixeira", materias: ["Física"] },
  { id: 18, nome: "Sara Moreira", materias: ["Física"] },
  { id: 19, nome: "Tiago Ramos", materias: ["Química"] },
  { id: 20, nome: "Ursula Gomes", materias: ["Química"] },
  { id: 21, nome: "Vitor Azevedo", materias: ["Química"] },
  { id: 22, nome: "William Rocha", materias: ["Química"] },
  { id: 23, nome: "Xênia Duarte", materias: ["Química"] },
  { id: 24, nome: "Yasmin Paiva", materias: ["Química"] },
  { id: 25, nome: "Zeca Monteiro", materias: ["Química"] },
  { id: 26, nome: "Alfredo Cunha", materias: ["Química"] },
  { id: 27, nome: "Bárbara Nunes", materias: ["Química"] },
  { id: 28, nome: "Caio Sena", materias: ["Biologia"] },
  { id: 29, nome: "Débora Vieira", materias: ["Biologia"] },
  { id: 30, nome: "Elisa Fonseca", materias: ["Biologia"] },
  { id: 31, nome: "Fabiano Rocha", materias: ["Biologia"] },
  { id: 32, nome: "Giovana Alves", materias: ["Biologia"] },
  { id: 33, nome: "Hugo Pires", materias: ["Biologia"] },
  { id: 34, nome: "Isis Moura", materias: ["Biologia"] },
  { id: 35, nome: "Jonas Farias", materias: ["Biologia"] },
  { id: 36, nome: "Karen Lopes", materias: ["Biologia"] },
  { id: 37, nome: "Leonardo Neri", materias: ["História"] },
  { id: 38, nome: "Marina Rocha", materias: ["História"] },
  { id: 39, nome: "Nelson Freitas", materias: ["História"] },
  { id: 40, nome: "Olívia Braga", materias: ["História"] },
  { id: 41, nome: "Paulo Martins", materias: ["História"] },
  { id: 42, nome: "Queila Duarte", materias: ["História"] },
  { id: 43, nome: "Rodrigo Macedo", materias: ["História"] },
  { id: 44, nome: "Sâmia Vilela", materias: ["História"] },
  { id: 45, nome: "Tânia Mourão", materias: ["História"] },
  { id: 46, nome: "Uillian Torres", materias: ["Geografia"] },
  { id: 47, nome: "Vanessa Lima", materias: ["Geografia"] },
  { id: 48, nome: "Wellington Costa", materias: ["Geografia"] },
  { id: 49, nome: "Xavier Barros", materias: ["Geografia"] },
  { id: 50, nome: "Yago Fernandes", materias: ["Geografia"] },
  { id: 51, nome: "Zilda Ramos", materias: ["Geografia"] },
  { id: 52, nome: "Agatha Souza", materias: ["Geografia"] },
  { id: 53, nome: "Brenda Garcia", materias: ["Geografia"] },
  { id: 54, nome: "Cecília Monteiro", materias: ["Geografia"] },
  { id: 55, nome: "Daniela Lopes", materias: ["Português"] },
  { id: 56, nome: "Eduardo Vieira", materias: ["Português"] },
  { id: 57, nome: "Fernanda Silva", materias: ["Português"] },
  { id: 58, nome: "Gabriel Nobre", materias: ["Português"] },
  { id: 59, nome: "Heloisa Dias", materias: ["Português"] },
  { id: 60, nome: "Ingrid Castro", materias: ["Português"] },
  { id: 61, nome: "João Ricardo", materias: ["Português"] },
  { id: 62, nome: "Karla Monteiro", materias: ["Português"] },
  { id: 63, nome: "Lucas Ferreira", materias: ["Português"] },
  { id: 64, nome: "Marília Paz", materias: ["Redação"] },
  { id: 65, nome: "Nádia Fagundes", materias: ["Redação"] },
  { id: 66, nome: "Otávio Silva", materias: ["Redação"] },
  { id: 67, nome: "Priscila Duarte", materias: ["Redação"] },
  { id: 68, nome: "Quintino Souza", materias: ["Redação"] },
  { id: 69, nome: "Rute Martins", materias: ["Redação"] },
  { id: 70, nome: "Samuel Pinho", materias: ["Redação"] },
  { id: 71, nome: "Talita Ramos", materias: ["Redação"] },
  { id: 72, nome: "Ubirajara Costa", materias: ["Redação"] },
  { id: 73, nome: "Valéria Fonseca", materias: ["Inglês"] },
  { id: 74, nome: "Wagner Brito", materias: ["Inglês"] },
  { id: 75, nome: "Ximena Duarte", materias: ["Inglês"] },
  { id: 76, nome: "Yuri Oliveira", materias: ["Inglês"] },
  { id: 77, nome: "Zenaide Freire", materias: ["Inglês"] },
  { id: 78, nome: "Alana Luz", materias: ["Inglês"] },
  { id: 79, nome: "Bruno César", materias: ["Inglês"] },
  { id: 80, nome: "Camila Lopes", materias: ["Inglês"] },
  { id: 81, nome: "Diego Souza", materias: ["Inglês"] },
  { id: 82, nome: "Elisa Braga", materias: ["Artes"] },
  { id: 83, nome: "Flávia Torres", materias: ["Artes"] },
  { id: 84, nome: "Giovana Melo", materias: ["Artes"] },
  { id: 85, nome: "Henrique Pires", materias: ["Artes"] },
  { id: 86, nome: "Isabela Cunha", materias: ["Artes"] },
  { id: 87, nome: "Julio Reis", materias: ["Artes"] },
  { id: 88, nome: "Késia Martins", materias: ["Artes"] },
  { id: 89, nome: "Leonardo Vieira", materias: ["Artes"] },
  { id: 90, nome: "Mariana Giorgi", materias: ["Artes"] },
  { id: 91, nome: "Nicolas Azevedo", materias: ["Programação"] },
  { id: 92, nome: "Otávio Braga", materias: ["Programação"] },
  { id: 93, nome: "Patrícia Martins", materias: ["Programação"] },
  { id: 94, nome: "Quésia Santos", materias: ["Programação"] },
  { id: 95, nome: "Rodrigo Silva", materias: ["Programação"] },
  { id: 96, nome: "Sabrina Costa", materias: ["Programação"] },
  { id: 97, nome: "Thiago Medeiros", materias: ["Programação"] },
  { id: 98, nome: "Ursula Castro", materias: ["Programação"] },
  { id: 99, nome: "Victor Souza", materias: ["Programação"] },
  { id: 100, nome: "Wagner Costa", materias: ["Educação Financeira"] },
  { id: 101, nome: "Yasmin Cerqueira", materias: ["Educação Financeira"] },
  { id: 102, nome: "Zuleica Freitas", materias: ["Educação Financeira"] },
  { id: 103, nome: "Alessandro Gomes", materias: ["Educação Financeira"] },
  { id: 104, nome: "Brenda Rocha", materias: ["Educação Financeira"] },
  { id: 105, nome: "César Oliveira", materias: ["Educação Financeira"] },
  { id: 106, nome: "Danilo Cunha", materias: ["Educação Financeira"] },
  { id: 107, nome: "Elaine Martins", materias: ["Educação Financeira"] },
  { id: 108, nome: "Fernando Silva", materias: ["Educação Financeira"] },
];

export function Tutors() {
  const [params] = useSearchParams();
  const materias = params.getAll("materias").map(s => s.trim()).filter(Boolean);

 const [page, setPage] = useState(1);
const [selectedTutorId, setSelectedTutorId] = useState<number | null>(null);

const data = useMemo(() => {
  if (materias.length === 0) return MOCK_INSTRUTORES;
  return MOCK_INSTRUTORES.filter((t) =>
    materias.every((m) =>
      (t.materias ?? []).some((x) => x.toLowerCase() === m.toLowerCase())
    )
  );
}, [materias]);

const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));

const pageItems = useMemo(() => {
  const start = (page - 1) * PAGE_SIZE;
  return data.slice(start, start + PAGE_SIZE);
}, [page, data]);

return (
  <main className="tutors">
    <section className="tutors-hero">
      <h1>Boa!</h1>
      <p>Agora, selecione um instrutor para solicitar ajuda.</p>
    </section>

    <div className="tutors__container">
      <section className="tutors__grid">
        {pageItems.map((t) => (
          <TutorCard
            key={t.id}
            nome={t.nome}
            selected={selectedTutorId === t.id}
            onClick={() => setSelectedTutorId(t.id)}
          />
        ))}
      </section>

      <PagerButtons
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />

      <div className="tutors__footer">
        <BackButton to="/topics" />
        <HelpButton disabled={!selectedTutorId} />
      </div>
    </div>
  </main>
);}