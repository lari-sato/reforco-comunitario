export function SearchBar() {
  return (
    <div className="search-bar" role="search">
      <input
        type="search"
        className="search-bar__input"
        placeholder="Pesquise aqui..."
        aria-label="Pesquisar"
      />
    </div>
  );
}
