import { useState } from "react";
import { buscarInstrutores } from "../lib/instrutores";

export function SearchBar() {
  const [term, setTerm] = useState("");

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!term.trim()) return;
    try {
      const resultados = await buscarInstrutores(term);
      console.log("Resultados da busca:", resultados);
    } catch (err) {
      console.error("Erro ao buscar:", err);
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="search"
        className="search-bar__input"
        placeholder="Pesquise aqui..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        aria-label="Pesquisar tópicos ou instrutores"
      />
    </form>
  );
}
